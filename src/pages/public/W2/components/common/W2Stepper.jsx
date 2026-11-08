import React from "react";
import { Check } from "lucide-react";
import STEPS from "../../../data/w2/steps.json";
import { W2_STEPS } from "../../utils/w2Flow";

/** Horizontal 5-step stepper; completed steps are clickable. */
const W2Stepper = ({ currentStep, onStepClick }) => (
  <div className="mb-10 sm:mb-14">
    <div className="relative max-w-4xl mx-auto">
      {/* Connecting Line behind circles */}
      <div
        className="absolute top-4 left-[10%] right-[10%] h-[1.5px] bg-slate-200 -z-0"
        aria-hidden="true"
      >
        <div
          className="h-full bg-secondary transition-all duration-300"
          style={{
            width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%`,
          }}
        />
      </div>

      {/* Stepper Circles & Labels */}
      <div className="relative z-10 flex items-center justify-between">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => {
                if (isCompleted) onStepClick(step.id);
              }}
              disabled={step.id > currentStep}
              className="flex-1 min-w-0 flex flex-col items-center group cursor-pointer focus:outline-hidden disabled:cursor-not-allowed"
            >
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-semibold text-[13px] sm:text-[14px] transition-all duration-200 ${
                  isActive
                    ? "bg-[#1E60F2] text-white ring-4 ring-[#1E60F2]/15 shadow-sm scale-105"
                    : isCompleted
                      ? "bg-[#DCEBFE] text-[#1E60F2] hover:bg-blue-200"
                      : "bg-white border-2 border-slate-300 text-slate-400"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.8]" />
                ) : step.id === W2_STEPS.CHECKOUT && isActive ? (
                  "$"
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`mt-2 text-[12px] sm:text-[13px] font-medium transition-colors text-center whitespace-nowrap ${
                  isActive
                    ? "text-[#1E60F2] font-semibold"
                    : isCompleted
                      ? "text-slate-700"
                      : "text-slate-400"
                }`}
              >
                {step.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default W2Stepper;
