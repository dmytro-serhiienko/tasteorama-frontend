type Props = {
  params: Promise<{ recipeType: string[] }>;
};

export default async function ProfilePage({ params }: Props) {
  const { recipeType } = await params;

  return (
    <div>
      <h1>ProfilePage</h1>
      <p>Current path: {recipeType?.join(' / ') || 'home'}</p>
    </div>
  );
}
