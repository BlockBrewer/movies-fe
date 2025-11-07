interface MovieCardProps {
  title: string
  year: number
  image: string
}

export function MovieCard({ title, year, image }: MovieCardProps) {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="w-[282px] h-[470px] rounded-2xl flex flex-col bg-[#092C39] shadow-lg overflow-hidden">
        <div className="h-[378px] w-full flex-shrink-0 p-2 pb-0">
          <div className="w-full h-full rounded-lg overflow-hidden">
            <img
              src={image || "/placeholder.svg"}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center p-4">
          <h3 className="text-white font-semibold text-xl leading-tight mb-2">{title}</h3>
          <p className="text-white text-base">{year}</p>
        </div>
      </div>
    </div>
  )
}
