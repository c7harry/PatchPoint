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
  },
  {
    id: '5',
    title: 'Local Bakery Introduces Gluten-Free Menu',
    summary: 'The family-owned bakery now offers a variety of gluten-free pastries and breads.',
    category: 'Business',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    source: 'Foodie News',
    image: undefined
  },
  {
    id: '6',
    title: 'Community Garden Yields Record Harvest',
    summary: 'Volunteers celebrate a bumper crop of vegetables and herbs this season.',
    category: 'Local',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    source: 'PatchPoint Local',
    image: undefined
  },
  {
    id: '7',
    title: 'Tech Startups Gather for Annual Innovation Expo',
    summary: 'Entrepreneurs showcase new apps and devices at the city convention center.',
    category: 'Technology',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
    source: 'TechWire',
    image: undefined
  },
  {
    id: '8',
    title: 'New Art Mural Unveiled Downtown',
    summary: 'Local artists collaborate on a vibrant mural celebrating community diversity.',
    category: 'Entertainment',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    source: 'Arts Beat',
    image: undefined
  },
  {
    id: '9',
    title: 'City Marathon Draws Record Number of Runners',
    summary: 'Participants from across the region compete in the annual event.',
    category: 'Sports',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    source: 'Sports Weekly',
    image: undefined
  },
  {
    id: '10',
    title: 'Local Hospital Expands Pediatric Wing',
    summary: 'The expansion will provide more beds and specialized care for children.',
    category: 'Health',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    source: 'Health News',
    image: undefined
  }
];
