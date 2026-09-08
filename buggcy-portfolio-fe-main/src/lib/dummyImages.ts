export const DUMMY_IMAGES = {
  portfolio: [
    "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    "https://buggcy.com/wp-content/uploads/2020/06/mobile.png",
    "https://buggcy.com/wp-content/uploads/2020/06/uiux.png",
    "https://buggcy.com/wp-content/uploads/2020/06/erp.png",
    "https://buggcy.com/wp-content/uploads/2020/06/devops.png",
    "https://buggcy.com/wp-content/uploads/2020/06/data-science.png",
  ],
  project: {
    hero: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    overview: "https://buggcy.com/wp-content/uploads/2020/06/mobile.png",
    process: "https://buggcy.com/wp-content/uploads/2020/05/development-1.png",
    result: "https://buggcy.com/wp-content/uploads/2020/06/erp.png",
  },
  successStory: [
    "https://buggcy.com/wp-content/uploads/2020/06/healthcare.png",
    "https://buggcy.com/wp-content/uploads/2020/06/fintech.png",
    "https://buggcy.com/wp-content/uploads/2020/06/ecom.png",
    "https://buggcy.com/wp-content/uploads/2020/06/education.png",
  ],
  service: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
  industry: "https://buggcy.com/wp-content/uploads/2020/06/Healthcare-1.png",
  blog: [
    "https://buggcy.com/wp-content/uploads/2020/06/education-software-development-elearning-app.png",
    "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
    "https://buggcy.com/wp-content/uploads/2020/06/mobile.png",
    "https://buggcy.com/wp-content/uploads/2020/06/data-science.png",
  ],
  about: "https://buggcy.com/wp-content/uploads/2020/06/web-development-img-min.png",
  careers: "https://buggcy.com/wp-content/uploads/2020/05/apply-job.svg",
  avatars: [
    "https://buggcy.com/wp-content/uploads/2020/06/full-time-min.png",
    "https://buggcy.com/wp-content/uploads/2020/06/part-time-min.png",
    "https://buggcy.com/wp-content/uploads/2020/06/hourly-min.png",
    "https://buggcy.com/wp-content/uploads/2020/06/Icon-5-1-1.png",
    "https://buggcy.com/wp-content/uploads/2020/06/Icon-6.png",
  ],
  serviceIcons: {
    webDevelopment: "https://buggcy.com/wp-content/uploads/2020/06/moniter-blue.svg",
    mobile: "https://buggcy.com/wp-content/uploads/2020/06/laptop-blue.svg",
    dataScraping: "https://buggcy.com/wp-content/uploads/2020/06/disk-blue.svg",
    bigData: "https://buggcy.com/wp-content/uploads/2020/06/thumb-blue.svg",
    devops: "https://buggcy.com/wp-content/uploads/2020/06/hands-blue.svg",
    iot: "https://buggcy.com/wp-content/uploads/2020/06/moniter-black.svg",
    support: "https://buggcy.com/wp-content/uploads/2020/06/laptop-black.svg",
    uiux: "https://buggcy.com/wp-content/uploads/2020/06/disk-black.svg",
    enterprise: "https://buggcy.com/wp-content/uploads/2020/06/thumb-black.svg",
    productManagement: "https://buggcy.com/wp-content/uploads/2020/06/hands-black.svg",
    qa: "https://buggcy.com/wp-content/uploads/2020/06/Icon-6.png",
  },
  industryIcons: {
    onDemand: "https://buggcy.com/wp-content/uploads/2020/06/On-Demand-Services.png",
    healthcare: "https://buggcy.com/wp-content/uploads/2020/06/Healthcare-1.png",
    ecommerce: "https://buggcy.com/wp-content/uploads/2020/06/Ecommerce.png",
    travel: "https://buggcy.com/wp-content/uploads/2020/06/Travel-and-Tourisum.png",
    food: "https://buggcy.com/wp-content/uploads/2020/06/Food-and-Grocery.png",
    finance: "https://buggcy.com/wp-content/uploads/2020/06/Finance-1.png",
    education: "https://buggcy.com/wp-content/uploads/2020/06/Education-1.png",
  },
  process: {
    meeting: "https://buggcy.com/wp-content/uploads/2020/04/meeting.svg",
    proposal: "https://buggcy.com/wp-content/uploads/2020/04/proposal.svg",
    design: "https://buggcy.com/wp-content/uploads/2020/04/design-min.png",
    development: "https://buggcy.com/wp-content/uploads/2020/05/development-1.png",
    testing: "https://buggcy.com/wp-content/uploads/2020/04/testing-1.svg",
    goLive: "https://buggcy.com/wp-content/uploads/2020/04/go-live.svg",
  },
} as const;

export function getDummyImage(index: number, type: keyof typeof DUMMY_IMAGES = "portfolio"): string {
  const images = DUMMY_IMAGES[type];
  if (Array.isArray(images)) {
    return images[index % images.length];
  }
  if (typeof images === "object" && images !== null) {
    const values = Object.values(images);
    return values[index % values.length] as string;
  }
  return images as string;
}
