import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import NavBar from "../Navbar";
import { useState } from "react";
import Footer from "../Footer";

const plans = [
  {
    title: "Counsel",
    featured: false,
    description: "All your essential business finances, taken care of.",
    priceMonthly: 10000,
    priceYearly: 50000,
    mainFeatures: [
      { id: 1, value: "Individual plan" },
      { id: 2, value: "Access to up to 5 clients per month" },
      { id: 3, value: "High rank recommendation" },
      { id: 4, value: "Keep track of analytics" },
    ],
  },
  {
    title: "Senior Counsel",
    featured: true,
    description: "The best financial services for your thriving business.",
    priceMonthly: 20000,
    priceYearly: 100000,
    mainFeatures: [
      { id: 1, value: "Law firm plan" },
      { id: 2, value: "Access unlimited clients per month" },
      { id: 3, value: "High rank recommendation" },
      { id: 4, value: "Keep track of analytics" },
      { id: 5, value: "Onboard all  firm lawyers" },
      { id: 6, value: "This is advanced" },
    ],
  },
  {
    title: "Legal Firm",
    featured: false,
    description: "Convenient features to take your business to the next level.",
    priceMonthly: 50000,
    priceYearly: 150000,
    mainFeatures: [
      { id: 1, value: "Law firm plan" },
      { id: 2, value: "Access unlimited clients per month" },
      { id: 3, value: "High rank recommendation" },
      { id: 4, value: "Keep track of analytics" },
      { id: 5, value: "Onboard all  firm lawyers" },
    ],
  },
];
const features = [
  {
    title: "Tax Savings",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Easy to use accounting",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Multi-accounts",
    tiers: [
      { title: "starter", value: "3 accounts" },
      { title: "popular", featured: true, value: "Unlimited accounts" },
      { title: "intermediate", value: "7 accounts" },
    ],
  },
  {
    title: "Invoicing",
    tiers: [
      { title: "starter", value: "3 invoices" },
      { title: "popular", featured: true, value: "Unlimited invoices" },
      { title: "intermediate", value: "10 invoices" },
    ],
  },
  {
    title: "Exclusive offers",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "6 months free advisor",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Mobile and web access",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
];
const perks = [
  {
    title: "24/7 customer support",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Instant notifications",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Budgeting tools",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Digital receipts",
    tiers: [
      { title: "starter", value: true },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Pots to separate money",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: true },
    ],
  },
  {
    title: "Free bank transfers",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
  {
    title: "Business debit card",
    tiers: [
      { title: "starter", value: false },
      { title: "popular", featured: true, value: true },
      { title: "intermediate", value: false },
    ],
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Pricing() {
  const [selected, setSelected] = useState("Monthly");
  return (
    <div className="bg-gray-50">
      <NavBar />
      <div className="relative bg-legalGreen">
        {/* Overlapping background */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 hidden h-6 w-full bg-gray-50 lg:block"
        />

        <div className="relative mx-auto max-w-2xl px-6 pt-16 text-center sm:pt-32 lg:max-w-7xl lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            <span className="block lg:inline">Transparent Pricing, </span>
            <span className="block lg:inline">No Hidden Fees.</span>
          </h1>
          <p className="mt-4 text-xl text-legalYellow">
            Trust your future with the top reviewed defense lawyers and law
            firms in Zambia.
          </p>
        </div>

        <h2 className="sr-only">Plans</h2>

        {/* Toggle */}
        <div className="relative mt-12 flex justify-center sm:mt-16">
          <div className="flex rounded-lg bg-dark p-0.5">
            <button
              type="button"
              onClick={() => {
                setSelected("Monthly");
              }}
              className="relative whitespace-nowrap rounded-md border-dark bg-white py-2 px-6 text-sm font-medium text-dark shadow-sm hover:bg-gray-100 focus:z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-legalGreen"
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => {
                setSelected("Yearly");
              }}
              className="relative ml-0.5 whitespace-nowrap rounded-md border border-transparent py-2 px-6 text-sm font-medium text-white hover:bg-legalGreen focus:z-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-legalGreen"
            >
              Yearly Billing
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="relative mx-auto mt-8 max-w-2xl px-6 pb-8 sm:mt-12 lg:max-w-7xl lg:px-8 lg:pb-0">
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute inset-0 top-4 bottom-6 left-8 right-8 hidden rounded-tl-lg rounded-tr-lg bg-dark lg:block"
          />

          <div className="relative space-y-6 lg:grid lg:grid-cols-3 lg:space-y-0">
            {plans.map((plan) => (
              <div
                key={plan.title}
                className={classNames(
                  plan.featured
                    ? "bg-white ring-2 ring-legalGreen shadow-md"
                    : "bg-dark lg:bg-transparent",
                  "pt-6 px-6 pb-3 rounded-lg lg:px-8 lg:pt-12"
                )}
              >
                <div>
                  <h3
                    className={classNames(
                      plan.featured ? "text-legalGreen" : "text-white",
                      "text-base font-semibold"
                    )}
                  >
                    {plan.title}
                  </h3>
                  <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between lg:flex-col lg:items-start">
                    <div className="mt-3 flex items-center">
                      {selected === "Monthly" && (
                        <p
                          className={classNames(
                            plan.featured ? "text-dark" : "text-white",
                            "text-4xl font-bold tracking-tight"
                          )}
                        >
                          zk.{plan.priceMonthly}
                        </p>
                      )}
                      {selected === "Yearly" && (
                        <p
                          className={classNames(
                            plan.featured ? "text-dark" : "text-white",
                            "text-4xl font-bold tracking-tight"
                          )}
                        >
                          zk.{plan.priceYearly}
                        </p>
                      )}

                      <div className="ml-4">
                        <p
                          className={classNames(
                            plan.featured ? "text-gray-700" : "text-white",
                            "text-sm"
                          )}
                        ></p>
                        {selected === "Monthly" && (
                          <div className="">
                            <p
                              className={classNames(
                                plan.featured ? "text-gray-700" : "text-white",
                                "text-sm"
                              )}
                            >
                              ZK / mo
                            </p>
                          </div>
                        )}
                        {selected === "Yearly" && (
                          <div className="ml-4">
                            <p
                              className={classNames(
                                plan.featured ? "text-gray-700" : "text-white",
                                "text-sm"
                              )}
                            >
                              ZK / yr
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <a
                      href="/lawyer-signup"
                      className={classNames(
                        plan.featured
                          ? "bg-legalGreen text-white hover:bg-dark"
                          : "bg-white text-legalGreen hover:bg-indigo-50",
                        "mt-6 w-full inline-block py-2 px-8 border border-transparent rounded-md shadow-sm text-center text-sm font-medium sm:mt-0 sm:w-auto lg:mt-6 lg:w-full"
                      )}
                    >
                      Signup for Free
                    </a>
                  </div>
                </div>
                <h4 className="sr-only">Features</h4>
                <ul
                  role="list"
                  className={classNames(
                    plan.featured
                      ? "border-gray-200 divide-gray-200"
                      : "border-dark divide-legalYellow divide-opacity-75",
                    "mt-7 border-t divide-y lg:border-t-0"
                  )}
                >
                  {plan.mainFeatures.map((mainFeature) => (
                    <li key={mainFeature.id} className="flex items-center py-3">
                      <CheckIcon
                        className={classNames(
                          plan.featured ? "text-dark" : "text-legalYellow",
                          "w-5 h-5 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      <span
                        className={classNames(
                          plan.featured ? "text-gray-600" : "text-white",
                          "ml-3 text-sm font-medium"
                        )}
                      >
                        {mainFeature.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <Footer /> 
      </div>

      {/* Feature comparison (up to lg) */}
      {/* <section
        aria-labelledby="mobile-comparison-heading"
        className="lg:hidden"
      >
        <h2 id="mobile-comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="mx-auto max-w-2xl space-y-16 py-16 px-6">
          {plans.map((plan, mobilePlanIndex) => (
            <div key="plan.title" className="border-t border-gray-200">
              <div
                className={classNames(
                  plan.featured ? "border-dark" : "border-transparent",
                  "-mt-px pt-6 border-t-2 sm:w-1/2"
                )}
              >
                <h3
                  className={classNames(
                    plan.featured ? "text-dark" : "text-gray-900",
                    "text-sm font-bold"
                  )}
                >
                  {plan.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>
              </div>
              <h4 className="mt-10 text-sm font-bold text-gray-900">
                Catered for business
              </h4>

              <div className="relative mt-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured ? "shadow-md" : "shadow",
                      "absolute right-0 w-1/2 h-full bg-white rounded-lg"
                    )}
                  />
                </div>

                <div
                  className={classNames(
                    plan.featured
                      ? "ring-2 ring-dark shadow-md"
                      : "ring-1 ring-black ring-opacity-5 shadow",
                    "relative py-3 px-4 bg-white rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none"
                  )}
                >
                  <dl className="divide-y divide-gray-200">
                    {features.map((feature) => (
                      <div
                        key={feature.title}
                        className="flex items-center justify-between py-3 sm:grid sm:grid-cols-2"
                      >
                        <dt className="pr-4 text-sm font-medium text-gray-600">
                          {feature.title}
                        </dt>
                        <dd className="flex items-center justify-end sm:justify-center sm:px-4">
                          {typeof feature.tiers[mobilePlanIndex].value ===
                          "string" ? (
                            <span
                              className={classNames(
                                feature.tiers[mobilePlanIndex].featured
                                  ? "text-dark"
                                  : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              {feature.tiers[mobilePlanIndex].value}
                            </span>
                          ) : (
                            <>
                              {feature.tiers[mobilePlanIndex].value === true ? (
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-legalYellow"
                                  aria-hidden="true"
                                />
                              ) : (
                                <XMarkIcon
                                  className="mx-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {feature.tiers[mobilePlanIndex].value === true
                                  ? "Yes"
                                  : "No"}
                              </span>
                            </>
                          )}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured
                        ? "ring-2 ring-indigo-600"
                        : "ring-1 ring-black ring-opacity-5",
                      "absolute right-0 w-1/2 h-full rounded-lg"
                    )}
                  />
                </div>
              </div>

              <h4 className="mt-10 text-sm font-bold text-gray-900">
                Other perks
              </h4>

              <div className="relative mt-6">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured ? "shadow-md" : "shadow",
                      "absolute right-0 w-1/2 h-full bg-white rounded-lg"
                    )}
                  />
                </div>

                <div
                  className={classNames(
                    plan.featured
                      ? "ring-2 ring-indigo-600 shadow-md"
                      : "ring-1 ring-black ring-opacity-5 shadow",
                    "relative py-3 px-4 bg-white rounded-lg sm:p-0 sm:bg-transparent sm:rounded-none sm:ring-0 sm:shadow-none"
                  )}
                >
                  <dl className="divide-y divide-gray-200">
                    {perks.map((perk) => (
                      <div
                        key={perk.title}
                        className="flex justify-between py-3 sm:grid sm:grid-cols-2"
                      >
                        <dt className="text-sm font-medium text-gray-600 sm:pr-4">
                          {perk.title}
                        </dt>
                        <dd className="text-center sm:px-4">
                          {perk.tiers[mobilePlanIndex].value === true ? (
                            <CheckIcon
                              className="mx-auto h-5 w-5 text-legalYellow"
                              aria-hidden="true"
                            />
                          ) : (
                            <XMarkIcon
                              className="mx-auto h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}

                          <span className="sr-only">
                            {perk.tiers[mobilePlanIndex].value === true
                              ? "Yes"
                              : "No"}
                          </span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 hidden sm:block"
                >
                  <div
                    className={classNames(
                      plan.featured
                        ? "ring-2 ring-indigo-600"
                        : "ring-1 ring-black ring-opacity-5",
                      "absolute right-0 w-1/2 h-full rounded-lg"
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section> */}

      {/* Feature comparison (lg+) */}
      {/* <section aria-labelledby="comparison-heading" className="hidden lg:block">
        <h2 id="comparison-heading" className="sr-only">
          Feature comparison
        </h2>

        <div className="mx-auto max-w-7xl py-24 px-8">
          <div className="flex w-full items-stretch border-t border-gray-200">
            <div className="-mt-px flex w-1/4 items-end py-6 pr-4">
              <h3 className="mt-auto text-sm font-bold text-gray-900">
                Catered for business
              </h3>
            </div>
            {plans.map((plan, planIdx) => (
              <div
                key={plan.title}
                aria-hidden="true"
                className={classNames(
                  planIdx === plans.length - 1 ? "" : "pr-4",
                  "-mt-px pl-4 w-1/4"
                )}
              >
                <div
                  className={classNames(
                    plan.featured ? "border-indigo-600" : "border-transparent",
                    "py-6 border-t-2"
                  )}
                >
                  <p
                    className={classNames(
                      plan.featured ? "text-indigo-600" : "text-gray-900",
                      "text-sm font-bold"
                    )}
                  >
                    {plan.title}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    {plan.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 flex items-stretch"
              aria-hidden="true"
            >
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow-md" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Business feature comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.title} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {features.map((feature) => (
                  <tr key={feature.title}>
                    <th
                      scope="row"
                      className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600"
                    >
                      {feature.title}
                    </th>
                    {feature.tiers.map((tier, tierIdx) => (
                      <td
                        key={tier.title}
                        className={classNames(
                          tierIdx === feature.tiers.length - 1
                            ? "pl-4"
                            : "px-4",
                          "relative w-1/4 py-0 text-center"
                        )}
                      >
                        <span className="relative h-full w-full py-3">
                          {typeof tier.value === "string" ? (
                            <span
                              className={classNames(
                                tier.featured
                                  ? "text-indigo-600"
                                  : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              {tier.value}
                            </span>
                          ) : (
                            <>
                              {tier.value === true ? (
                                <CheckIcon
                                  className="mx-auto h-5 w-5 text-legalYellow"
                                  aria-hidden="true"
                                />
                              ) : (
                                <XMarkIcon
                                  className="mx-auto h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              )}

                              <span className="sr-only">
                                {tier.value === true ? "Yes" : "No"}
                              </span>
                            </>
                          )}
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="pointer-events-none absolute inset-0 flex items-stretch"
              aria-hidden="true"
            >
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>

          <h3 className="mt-10 text-sm font-bold text-gray-900">Other perks</h3>

          <div className="relative mt-6">
            <div
              className="pointer-events-none absolute inset-0 flex items-stretch"
              aria-hidden="true"
            >
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg bg-white shadow-md" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg bg-white shadow" />
              </div>
            </div>

            <table className="relative w-full">
              <caption className="sr-only">Perk comparison</caption>
              <thead>
                <tr className="text-left">
                  <th scope="col">
                    <span className="sr-only">Perk</span>
                  </th>
                  {plans.map((plan) => (
                    <th key={plan.title} scope="col">
                      <span className="sr-only">{plan.title} plan</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {perks.map((perk) => (
                  <tr key={perk.title}>
                    <th
                      scope="row"
                      className="w-1/4 py-3 pr-4 text-left text-sm font-medium text-gray-600"
                    >
                      {perk.title}
                    </th>
                    {perk.tiers.map((tier, tierIdx) => (
                      <td
                        key={tier.title}
                        className={classNames(
                          tierIdx === perk.tiers.length - 1 ? "pl-4" : "px-4",
                          "relative w-1/4 py-0 text-center"
                        )}
                      >
                        <span className="relative h-full w-full py-3">
                          {tier.value === true ? (
                            <CheckIcon
                              className="mx-auto h-5 w-5 text-legalYellow"
                              aria-hidden="true"
                            />
                          ) : (
                            <XMarkIcon
                              className="mx-auto h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          )}

                          <span className="sr-only">
                            {tier.value === true ? "Yes" : "No"}
                          </span>
                        </span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div
              className="pointer-events-none absolute inset-0 flex items-stretch"
              aria-hidden="true"
            >
              <div className="w-1/4 pr-4" />
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
              <div className="w-1/4 px-4">
                <div className="h-full w-full rounded-lg ring-2 ring-indigo-600 ring-opacity-100" />
              </div>
              <div className="w-1/4 pl-4">
                <div className="h-full w-full rounded-lg ring-1 ring-black ring-opacity-5" />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
