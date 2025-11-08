import * as React from "react"
import * as RadixDialog from "@radix-ui/react-dialog"
import { cn } from "@/lib/utils"

const Dialog = RadixDialog.Root
const DialogTrigger = RadixDialog.Trigger
const DialogClose = RadixDialog.Close

function DialogContent({ className = "", ...props }) {
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <RadixDialog.Content
        className={cn(
          "fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-background p-6 shadow-lg outline-none",
          className
        )}
        {...props}
      />
    </RadixDialog.Portal>
  )
}

function DialogHeader({ className = "", ...props }) {
  return <div className={cn("flex flex-col space-y-1.5", className)} {...props} />
}

function DialogTitle({ className = "", ...props }) {
  return <RadixDialog.Title className={cn("text-lg font-semibold", className)} {...props} />
}

function DialogFooter({ className = "", ...props }) {
  return <div className={cn("flex justify-end gap-2", className)} {...props} />
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
}