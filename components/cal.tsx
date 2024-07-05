"use client";

import Cal from "@calcom/embed-react";

export function CalComponent() {
    return (
        <div className="mx-auto w-full text-center px-4" data-testid="cal-component">
            {/* <h2 className="font-bold tracking-tight text-gray-900 sm:text-2xl">
                Sound interesting? Let&apos;s talk
                <br />
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg tracking-tight leading-8 text-gray-600">
                Let us automate your demo building for you.
            </p> */}
            {/* <div>Mocked CalComponent2</div> */}
            <Cal
                className="mt-4"
                calLink="team-bonsai/consult"
                style={{ width: "100%", height: "100%", overflow: "scroll" }}
                config={{ layout: "month_view" }}
            />
        </div>
    );
}