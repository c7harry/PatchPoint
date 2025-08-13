export interface Article {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string; // ISO
  source: string;
  image?: string;
}

export const sampleArticles: Article[] = [
  {
    id: '1',
    title: 'City Council Approves New Park Renovation Plan',
    summary: 'The downtown green space will receive funding for playground upgrades and native plant restoration.',
    category: 'Local',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    source: 'PatchPoint Local',
    image: undefined
  },
  {
    id: '2',
    title: 'High School Robotics Team Advances to Finals',
    summary: 'Students credit community mentors and after-school STEM programs for their success.',
    category: 'Education',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    source: 'Community Wire',
    image: undefined
  },
  {
    id: '3',
    title: 'Farmers Market Extends Season Through November',
    summary: 'Vendors will offer late-harvest produce, baked goods, and artisan crafts on Saturdays.',
    category: 'Business',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    source: 'AgriNews',
    image: undefined
  },
  {
    id: '4',
    title: 'Library Launches Evening Homework Help Program',
    summary: 'Volunteer tutors will provide drop-in assistance for middle and high school students.',
    category: 'Education',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    source: 'PatchPoint Local',
    image: undefined
  }
];
