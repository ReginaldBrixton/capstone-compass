import {
  Toast,
  ToastContent,
  ToastItem,
  ToastTrigger,
} from "@/components/ui/toast"

// Default Toast
<Toast type="single" dismissible>
  <ToastItem value="toast-1">
    <ToastTrigger>Show Notification</ToastTrigger>
    <ToastContent>
      This is a default toast notification.
    </ToastContent>
  </ToastItem>
</Toast>

// Colored Toast
<Toast type="single" dismissible variant="colored">
  <ToastItem value="toast-2">
    <ToastTrigger>Show Colored Notification</ToastTrigger>
    <ToastContent>
      This is a colored toast notification.
    </ToastContent>
  </ToastItem>
</Toast>

// Flush Toast (no borders/rounded corners)
<Toast type="single" dismissible flush>
  <ToastItem value="toast-3">
    <ToastTrigger>Show Flush Notification</ToastTrigger>
    <ToastContent>
      This is a flush toast notification.
    </ToastContent>
  </ToastItem>
</Toast>

// Always Open Toast (multiple toasts can be open)
<Toast type="multiple">
  <ToastItem value="toast-4">
    <ToastTrigger>Show Multiple Notifications</ToastTrigger>
    <ToastContent>
      This is the first toast in a multiple toast setup.
    </ToastContent>
  </ToastItem>
  <ToastItem value="toast-5">
    <ToastContent>
      This is the second toast in a multiple toast setup.
    </ToastContent>
  </ToastItem>
</Toast>

// Toast with Icons
<Toast type="single" dismissible>
  <ToastItem value="toast-6">
    <ToastTrigger icon={<YourIcon />}>Show Icon Notification</ToastTrigger>
    <ToastContent>
      This toast includes an icon.
    </ToastContent>
  </ToastItem>
</Toast>