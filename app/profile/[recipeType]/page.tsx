import { notFound } from 'next/navigation'
import ProfileNavigation from "@/components/ProfileNavigation/ProfileNavigation";

type Props = {
  params: Promise<{ recipeType: string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { recipeType } = await params;
  if (recipeType !== 'own' && recipeType !== 'favorites') {
    notFound()
  };

  return (
    <div>
      <h1>My profile</h1>
      <ProfileNavigation />
      <p>Active tab: {recipeType}</p>
    </div>
  );
}
