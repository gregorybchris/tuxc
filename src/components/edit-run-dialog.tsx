import { EditRunForm } from "@/components/edit-run-form";
import { Run } from "@/lib/models/run";
import { LinkText } from "@/widgets/link-text";
import { X } from "@phosphor-icons/react";
import * as Dialog from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface EditRunDialogProps {
  run: Run;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

/**
 * The edit form over the run you are already looking at.
 *
 * Suggesting a change is a small enough errand that it should not cost you the
 * map and the route details.
 */
export function EditRunDialog({
  run,
  open,
  onOpenChange,
  children,
}: EditRunDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        {/* Deeper in dark, where a 40% scrim over a near-black page is barely
            a scrim at all. */}
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/40 dark:bg-black/70" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[85vh] w-[calc(100vw-2rem)] max-w-measure -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-xl bg-raised p-6 shadow-xl focus:outline-none">
          <div className="flex flex-row items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <Dialog.Title className="text-lg font-bold tracking-tight text-ink/80">
                Suggest an edit
              </Dialog.Title>
              <Dialog.Description className="text-sm leading-relaxed text-ink/60">
                When you edit a run, site maintainers will review your request
                and update the run archive. If your edits are not visible on the
                site within a few days, send an email to{" "}
                <LinkText
                  text="tuxc.org@gmail.com"
                  href="mailto:tuxc.org@gmail.com"
                />
                .
              </Dialog.Description>
            </div>

            <Dialog.Close
              className="-mr-2 -mt-2 rounded p-1.5 text-ink/50 outline-none transition-colors hover:bg-ink/5 hover:text-ink/80 focus-visible:ring-2 focus-visible:ring-accent"
              aria-label="Close"
            >
              <X size={20} />
            </Dialog.Close>
          </div>

          <EditRunForm run={run} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
