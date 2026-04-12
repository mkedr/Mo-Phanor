export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading articles...</p>
      </div>
    </div>
  )
}
