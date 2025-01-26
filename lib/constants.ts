import {
  BaggageClaim,
  Briefcase,
  Dribbble,
  HeartIcon,
  Soup,
  Umbrella,
  Users,
  Zap,
} from "lucide-vue-next";

export const vibeLists = [
  {
    id: "romantic",
    icon: HeartIcon,
    name: "Romantic",
  },
  {
    id: "active",
    icon: Zap,
    name: "Active",
  },
  {
    id: "culture",
    icon: Umbrella,
    name: "Culture",
  },
  {
    id: "sport",
    icon: Dribbble,
    name: "Sport",
  },
  {
    id: "withKids",
    icon: Users,
    name: "With Kids",
  },
  {
    id: "slowPaced",
    icon: BaggageClaim,
    name: "Slow-Paced",
  },
  {
    id: "foodies",
    icon: Soup,
    name: "Foodies",
  },
  {
    id: "workstation",
    icon: Briefcase,
    name: "workstation",
  },
];

export const steps = ref<
  { step: number; title: string; value: string | null | number }[]
>([
  {
    step: 0,
    title: "Dream Destination",
    value: null,
  },
  {
    step: 1,
    title: "When are you traveling?",
    value: null,
  },
  {
    step: 2,
    title: "Who’s coming along?",
    value: null,
  },
  {
    step: 3,
    title: "What’s your budget?",
    value: null,
  },
  {
    step: 4,
    title: "What’s your vibe?",
    value: null,
  },
]);

export const places = [
  {
    city: "Paris",
    country: "France",
  },
  {
    city: "New York",
    country: "USA",
  },
  {
    city: "Tokyo",
    country: "Japan",
  },
  {
    city: "London",
    country: "UK",
  },
  {
    city: "Rome",
    country: "Italy",
  },
  {
    city: "Amsterdam",
    country: "Netherlands",
  },
];
