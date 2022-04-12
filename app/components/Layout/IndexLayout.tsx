function Layout({
  children,
  onboardExp,
}: {
  children: React.ReactNode;
  onboardExp: boolean;
}) {
  return (
    <div className="min-h-full bg-gray-200">
      <section className="bg-gray-800 py-12 text-white">
        <header>
          <h1 className="p-8 text-center text-4xl md:text-5xl">
            Project Estimator
          </h1>
        </header>
        {onboardExp ? (
          <h2 className="mt-2 mb-4 px-5 text-center text-xl md:text-2xl">
            Hey 👋🏻, seems like you don't have any projects. Lets get started!
          </h2>
        ) : null}
      </section>
      <div className="project-view flex items-center justify-center pt-10">
        <div className="project-creation-form mx-auto">{children}</div>
      </div>
    </div>
  );
}

export { Layout };
