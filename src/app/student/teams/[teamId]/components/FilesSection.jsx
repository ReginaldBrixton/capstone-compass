import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiEdit2, FiFile, FiFolder, FiFolderPlus, FiTrash2, FiUpload } from 'react-icons/fi';
import styled from 'styled-components';
import ConfirmDialog from './ConfirmDialog';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem);
`;
const ActionBar = styled.div`
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
  flex-wrap: wrap;
`;
const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: clamp(0.5rem, 1.5vw, 0.8rem) clamp(1rem, 2vw, 1.5rem);
  border-radius: 8px;
  border: none;
  background: #edf2f7;
  color: #2d3748;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    transform: translateY(-1px);
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;
const FileGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: clamp(1rem, 2vw, 1.5rem);
`;
const FileCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: clamp(1rem, 2vw, 1.5rem);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
const FileHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .icon {
    font-size: 1.5rem;
    color: #4a5568;
  }
`;
const FileInfo = styled.div`
  flex: 1;

  h3 {
    font-size: clamp(0.9rem, 1.5vw, 1.1rem);
    color: #2d3748;
    margin-bottom: 0.25rem;
    word-break: break-word;
  }

  .meta {
    font-size: clamp(0.8rem, 1.2vw, 0.9rem);
    color: #718096;
  }
`;
const FileActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;
const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 6px;
  border: none;
  background: #edf2f7;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e2e8f0;
    color: #2d3748;
  }

  svg {
    width: 1.2em;
    height: 1.2em;
  }
`;
const UploadOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: clamp(1rem, 3vw, 2rem);
`;
const UploadZone = styled(motion.div)`
  background: white;
  border-radius: clamp(1rem, 2vw, 1.5rem);
  padding: clamp(2rem, 4vw, 3rem);
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;

  .icon {
    font-size: 3rem;
    color: #4a5568;
  }

  h3 {
    font-size: clamp(1.2rem, 2vw, 1.5rem);
    color: #2d3748;
  }

  p {
    color: #718096;
    font-size: clamp(0.9rem, 1.5vw, 1rem);
  }

  input {
    display: none;
  }
`;
const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
`;
const FilterSelect = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;
const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  font-size: 0.9rem;
  flex: 1;
  min-width: 200px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;
const BreadcrumbNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;
const BreadcrumbItem = styled.button`
  background: none;
  border: none;
  color: ${({ $active }) => ($active ? '#2d3748' : '#4a5568')};
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;

  &:hover {
    background: #edf2f7;
  }

  &:after {
    content: ${({ $last }) => ($last ? '""' : '"/"')};
    margin-left: 0.5rem;
    color: #718096;
  }
`;
const FilesSection = ({ teamId }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPath, setCurrentPath] = useState('/');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Simulated API call to fetch files
    const fetchFiles = async () => {
      setLoading(true);
      try {
        // Replace with actual API call
        const mockFiles = [
          {
            id: 1,
            name: 'Project Documentation',
            type: 'folder',
            itemCount: 5,
            path: '/',
          },
          {
            id: 2,
            name: 'Meeting Notes.docx',
            type: 'file',
            size: '256 KB',
            path: '/',
          },
          {
            id: 3,
            name: 'Design Assets',
            type: 'folder',
            itemCount: 12,
            path: '/',
          },
          {
            id: 4,
            name: 'Presentation.pptx',
            type: 'file',
            size: '4.2 MB',
            path: '/',
          },
        ];
        setTimeout(() => {
          setFiles(mockFiles);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching files:', error);
        setLoading(false);
      }
    };
    fetchFiles();
  }, [teamId, currentPath]);
  const handleUpload = async (event) => {
    const files = event.target.files;
    if (!files.length) return;
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Uploading files:', files);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setShowUpload(false);
    }
  };
  const handleCreateFolder = async () => {
    const folderName = prompt('Enter folder name:');
    if (!folderName) return;
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Creating folder:', folderName);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };
  const handleDelete = async () => {
    if (!selectedFile) return;
    try {
      // Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFiles(files.filter((file) => file.id !== selectedFile.id));
      console.log('Deleted file:', selectedFile.id);
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setShowDeleteDialog(false);
      setSelectedFile(null);
    }
  };
  const handleNavigate = (path) => {
    setCurrentPath(path);
  };
  const getBreadcrumbs = () => {
    const parts = currentPath.split('/').filter(Boolean);
    return [
      <BreadcrumbItem
        key="root"
        onClick={() => handleNavigate('/')}
        $active={currentPath === '/'}
        $last={parts.length === 0}
        data-oid="im_m7:o"
      >
        Root
      </BreadcrumbItem>,
      ...parts.map((part, index) => {
        const path = '/' + parts.slice(0, index + 1).join('/');
        return (
          <BreadcrumbItem
            key={path}
            onClick={() => handleNavigate(path)}
            $active={currentPath === path}
            $last={index === parts.length - 1}
            data-oid="ur5iybf"
          >
            {part}
          </BreadcrumbItem>
        );
      }),
    ];
  };
  const filteredFiles = files
    .filter((file) => file.path === currentPath)
    .filter((file) => {
      if (filter === 'all') return true;
      return file.type === filter;
    })
    .filter((file) => {
      if (!searchQuery) return true;
      return file.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => {
      // Folders always come first
      if (a.type !== b.type) {
        return a.type === 'folder' ? -1 : 1;
      }
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'size':
          if (a.type === 'folder') return 0;
          return parseFloat(a.size) - parseFloat(b.size);
        default:
          return 0;
      }
    });
  return (
    <Container className="FilesSection-container" data-oid="24hsh4z">
      <ActionBar className="FilesSection-actionBar" data-oid="ed97fyg">
        <ActionButton
          className="FilesSection-uploadButton"
          onClick={() => setShowUpload(true)}
          data-oid="anl7u-i"
        >
          <FiUpload data-oid="8plika1" /> Upload Files
        </ActionButton>
        <ActionButton
          className="FilesSection-newFolderButton"
          onClick={handleCreateFolder}
          data-oid="j9ojf9q"
        >
          <FiFolderPlus data-oid="7u-lije" /> New Folder
        </ActionButton>
      </ActionBar>

      <BreadcrumbNav className="FilesSection-breadcrumbNav" data-oid="wgq5udj">
        {getBreadcrumbs()}
      </BreadcrumbNav>

      <FilterBar className="FilesSection-filterBar" data-oid="dzknm40">
        <FilterSelect
          className="FilesSection-filterSelect"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          data-oid="j4ephw7"
        >
          <option value="all" data-oid="syhc68f">
            All Types
          </option>
          <option value="file" data-oid=".q6l-hj">
            Files
          </option>
          <option value="folder" data-oid="y331ulr">
            Folders
          </option>
        </FilterSelect>

        <FilterSelect
          className="FilesSection-sortSelect"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          data-oid="j2.ha24"
        >
          <option value="name" data-oid="-2j:zms">
            Sort by Name
          </option>
          <option value="size" data-oid="jgc4cpt">
            Sort by Size
          </option>
        </FilterSelect>

        <SearchInput
          className="FilesSection-searchInput"
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          data-oid="7xx8e_c"
        />
      </FilterBar>

      <FileGrid className="FilesSection-fileGrid" data-oid="z.t7s1h">
        <AnimatePresence data-oid="lukxwx8">
          {loading ? (
            <motion.div
              className="FilesSection-loading"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                gridColumn: '1 / -1',
              }}
              data-oid=".q5oe5h"
            >
              Loading files...
            </motion.div>
          ) : filteredFiles.length === 0 ? (
            <motion.div
              className="FilesSection-noFiles"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              style={{
                textAlign: 'center',
                padding: '2rem',
                gridColumn: '1 / -1',
              }}
              data-oid="zs3mgot"
            >
              No files found
            </motion.div>
          ) : (
            filteredFiles.map((file) => (
              <FileCard
                className="FilesSection-fileCard"
                key={file.id}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                }}
                onClick={() =>
                  file.type === 'folder' && handleNavigate(currentPath + file.name + '/')
                }
                style={{
                  cursor: file.type === 'folder' ? 'pointer' : 'default',
                }}
                data-oid="k:kyqq1"
              >
                <FileHeader className="FilesSection-fileHeader" data-oid="_ncdgiv">
                  <div className="icon" data-oid="odfzqvs">
                    {file.type === 'folder' ? (
                      <FiFolder data-oid="75p24yo" />
                    ) : (
                      <FiFile data-oid="_ga9.tn" />
                    )}
                  </div>
                  <FileInfo className="FilesSection-fileInfo" data-oid="50hypu5">
                    <h3 className="FilesSection-fileName" data-oid="x2le1xz">
                      {file.name}
                    </h3>
                    <div className="meta" data-oid=":sjde9b">
                      {file.type === 'folder' ? `${file.itemCount} items` : file.size}
                    </div>
                  </FileInfo>
                </FileHeader>
                <FileActions className="FilesSection-fileActions" data-oid="4u6-n_e">
                  <IconButton
                    className="FilesSection-editButton"
                    aria-label="Edit"
                    data-oid="_dzts_2"
                  >
                    <FiEdit2 data-oid="a:t39i5" />
                  </IconButton>
                  <IconButton
                    className="FilesSection-deleteButton"
                    aria-label="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(file);
                      setShowDeleteDialog(true);
                    }}
                    data-oid="ul.2ltf"
                  >
                    <FiTrash2 data-oid="la9g2jb" />
                  </IconButton>
                </FileActions>
              </FileCard>
            ))
          )}
        </AnimatePresence>
      </FileGrid>

      <AnimatePresence data-oid="q7.3duj">
        {showUpload && (
          <UploadOverlay
            className="FilesSection-uploadOverlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setShowUpload(false)}
            data-oid="fg9j92d"
          >
            <UploadZone
              className="FilesSection-uploadZone"
              initial={{
                scale: 0.9,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.9,
                opacity: 0,
              }}
              onClick={(e) => e.stopPropagation()}
              data-oid="6ut1m25"
            >
              <div className="icon" data-oid="uuad8ep">
                <FiUpload data-oid="453qdv9" />
              </div>
              <h3 data-oid="5e_1ple">Upload Files</h3>
              <p data-oid="uljk3rr">Drag and drop files here or click to browse</p>
              <ActionButton
                className="FilesSection-chooseFilesButton"
                as="label"
                data-oid="oqn_dgi"
              >
                <FiUpload data-oid="8tcxuy3" /> Choose Files
                <input
                  type="file"
                  multiple
                  onChange={handleUpload}
                  accept="*/*"
                  data-oid="3xtw2o6"
                />
              </ActionButton>
            </UploadZone>
          </UploadOverlay>
        )}
      </AnimatePresence>

      <ConfirmDialog
        className="FilesSection-confirmDialog"
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setSelectedFile(null);
        }}
        onConfirm={handleDelete}
        title="Delete Item"
        message={`Are you sure you want to delete "${selectedFile?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        icon="🗑️"
        data-oid="02z.r0d"
      />
    </Container>
  );
};
export default FilesSection;
