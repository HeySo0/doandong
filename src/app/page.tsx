import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex-1 space-y-12 px-8 py-8">
      {/* Creation Section */}
      <section className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          생성: 무엇을 만들어 볼까요?
        </h1>

        <div className="flex grid grid-cols-2 gap-4 md:grid-cols-5">
          {[
            { icon: '👕', label: '상의' },
            { icon: '🧣', label: '목도리' },
            { icon: '🧦', label: '양말' },
            { icon: '🧸', label: '인형' },
            { icon: '🎨', label: '기타' }
          ].map(item => (
            <button
              key={item.label}
              className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-indigo-50 p-6 transition-colors hover:bg-indigo-100 dark:bg-gray-800 dark:hover:bg-gray-700">
              <span className="text-4xl transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Management Section */}
      <section className="space-y-6">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            관리: 내 작업 이어가기
          </h2>

          <div className="flex gap-2">
            <button className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
              최근 작업
            </button>
            <button className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800">
              구매한 도안
            </button>
            <button className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800">
              즐겨찾기
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="group cursor-pointer">
              <div className="relative mb-3 aspect-[3/4] overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-700">
                {/* Placeholder for Thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 font-medium text-gray-400 transition-colors group-hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-500 dark:group-hover:bg-gray-700">
                  THUMB
                </div>
              </div>
              <h3 className="truncate font-medium text-gray-900 dark:text-gray-100">
                작업 파일명 {i}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                2026.01.{20 + i} 수정됨
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
