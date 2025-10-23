export default function MainContent({children,
}: {
  children: React.ReactNode
}) {
    return (
        <div className="lg:w-[80%]">
            {children}
        </div>
    )
}