"use client";

import { SubmitRunForm } from "@/app/components/submit-run-form";
import { LinkText } from "@/app/widgets/link-text";

export default function SubmitRunPage() {
  return (
    <div className="h-full w-full px-5 py-10 md:px-20 md:py-12">
      <div className="flex w-full flex-col items-center gap-5 md:items-start">
        <div className="flex w-full flex-col items-center text-xl">
          <div className="text-xl font-bold text-black/60">Submit a Run</div>
        </div>

        <div className="flex w-full flex-col items-center gap-6">
          <div className="w-full md:w-[500px]">
            <div className="text-justify indent-4">
              When you submit a run, site maintainers will review your request
              and update the run archive. If your run is not visible on the site
              within a few days, send an email to{" "}
              <LinkText
                text="tuxc.org@gmail.com"
                href={`mailto:tuxc.org@gmail.com`}
              />
              .
            </div>
          </div>

          <SubmitRunForm editMode={false} />
        </div>
      </div>
    </div>
  );
}
