import { NextResponse } from 'next/server';
import { verifyToken } from '../session/utils';

// In-memory storage for submissions
const submissions = new Map();

// Helper to check if user is authorized
function isAuthorized(userId, role) {
  return userId && (role === 'supervisor' || role === 'student');
}

// GET handler
export async function GET(request) {
  try {
    // Get auth token from header
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('id');

    if (submissionId) {
      // Return specific submission
      const submission = submissions.get(submissionId);
      if (!submission) {
        return NextResponse.json(
          { error: 'Submission not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(submission);
    }

    // Return all submissions for the user
    const userSubmissions = Array.from(submissions.values()).filter(
      (sub) => sub.studentId === userId || sub.supervisorId === userId
    );
    return NextResponse.json(userSubmissions);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST handler
export async function POST(request) {
  try {
    // Get auth token from header
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, supervisorId } = body;

    if (!title || !content || !supervisorId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new submission
    const submissionId = `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newSubmission = {
      id: submissionId,
      title,
      content,
      studentId: userId,
      supervisorId,
      status: 'pending',
      feedback: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    submissions.set(submissionId, newSubmission);
    return NextResponse.json(newSubmission, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT handler
export async function PUT(request) {
  try {
    // Get auth token from header
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const userId = verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const submissionId = searchParams.get('id');

    if (!submissionId) {
      return NextResponse.json(
        { error: 'Submission ID required' },
        { status: 400 }
      );
    }

    const submission = submissions.get(submissionId);
    if (!submission) {
      return NextResponse.json(
        { error: 'Submission not found' },
        { status: 404 }
      );
    }

    // Only allow supervisor to update feedback
    if (submission.supervisorId !== userId) {
      return NextResponse.json(
        { error: 'Not authorized to update this submission' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { feedback, status } = body;

    if (!feedback || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Update submission
    const updatedSubmission = {
      ...submission,
      feedback,
      status,
      updatedAt: new Date().toISOString(),
    };

    submissions.set(submissionId, updatedSubmission);
    return NextResponse.json(updatedSubmission);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
