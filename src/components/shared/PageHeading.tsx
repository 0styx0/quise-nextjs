interface PageHeadingProps {
  heading: string;
}

export function PageHeading({ heading }: PageHeadingProps) {
  return <h1 className="text-2xl font-bold mb-4">{heading}</h1>;
}
