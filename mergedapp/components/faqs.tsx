import Accordion from '@/components/utils/accordion'

export default function Faqs() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-200">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-20">
            <h2 className="h2">Frequently Asked Questions</h2>
          </div>

          {/* Faqs */}
          <ul className="max-w-3xl mx-auto pl-12">
            <Accordion title="Is the oral form effective?" active>
              <a href="https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(23)01185-6/abstract" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Clinical studies</a> are showing that the oral forms are just as effective as the inejctions, when used at higher dosages. The compounding pharmacies that we work with are able to compound at the dosages required to be effective for our patients.
            </Accordion>
            <Accordion title="Do the oral forms cause more nausea and side effects?">
              <a href="https://pubmed.ncbi.nlm.nih.gov/36700417/" target="_blank" rel="noopener noreferrer" className="text-teal-700 underline">Clinical studies</a> have shown that the side effects of both the injections and the oral forms are similar, although more people complained about belching on the oral form. The most common side effects are nausea and diarrhea, which are usually mild and go away after a few days. Both forms need to be titrated up in quantity to ensure the body adjusts to the medication. SUSTAIN and PIONEER clinical trial programs also reported that gastrointestinal disorders were prevalent with both subcutaneous and oral semaglutide, with a slightly higher incidence in the oral form (39.1%) compared to subcutaneous (41.9%)
            </Accordion>
            <Accordion title="What's the difference between the sublingual and oral form?">
              Sublingual medications are taken under the tongue and absorbed through the mucous membranes, while the oral forms are swallowed and absorbed through the stomach. The sublingual forms bypass first pass digestion in the stomach and the liver so they have a higher bioavailability. This means that you need less of the active ingredient in the sublingual form to achieve the same effect as the oral form and decreases side effects.
            </Accordion>
            <Accordion title="Why oral? Why not injections?">
              Oral weightloss medication is taken once daily, ensuring a more even dosage throughout the week, instead of the peaks and valleys in appetite suppression of the injections. Also, people who are afraid of needles can access the medication they need to stay healthy!
            </Accordion>
            <Accordion title="Why should I trust the oral formulations?">
              We only work with pharmacies that obtain their semaglutide from FDA-registered sources to ensure the potency and purity of our compounded suspensions.
            </Accordion>
            <span className="block border-t border-gray-200" aria-hidden="true"></span>
          </ul>

        </div>
      </div>
    </section>
  )
}