import React from "react";
import PublicDocPage from "../../shared/PublicDocPage";

const Paragraphs = ({ items }) =>
  items?.map((text) => (
    <p key={text} className="text-slate-600 text-[15px] leading-relaxed">
      {text}
    </p>
  ));

/** Renders a legal page from its JSON content: { title, updated, intro, sections[{ heading, body, list, after }] }. */
const LegalDocument = ({ doc, eyebrow }) => (
  <PublicDocPage eyebrow={eyebrow} title={doc.title} updated={doc.updated} intro={doc.intro}>
    <div className="space-y-9">
      {doc.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">{section.heading}</h2>
          <Paragraphs items={section.body} />
          {section.list && (
            <ul className="space-y-2.5">
              {section.list.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-600 text-[15px] leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#009BFB] mt-2.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          <Paragraphs items={section.after} />
        </section>
      ))}
    </div>
  </PublicDocPage>
);

export default LegalDocument;
