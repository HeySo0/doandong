interface PatternDetailProps {
  params: Promise<{ id: string }>
}

export default async function PatternDetailPage({
  params
}: PatternDetailProps) {
  // 3. params를 await로 기다려야 id를 꺼낼 수 있습니다. (Next.js 15+ 규칙)
  const { id } = await params

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">도안 상세 페이지</h1>
      <p className="mt-4 text-blue-600">
        현재 보고 계신 도안 번호는 <span className="font-bold">{id}</span>
        번입니다.
      </p>
      {/* 여기서 id를 이용해 db.pattern.findUnique({ where: { id } }) 같은 로직을 실행합니다. */}
    </div>
  )
}

// 'use client';
// import { use } from 'react';

// export default function PatternClientPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params); // Promise를 풀어서 id를 가져옴
//   return <div>ID: {id}</div>;
// }

// 'use client';
// import { useParams } from 'next/navigation';

// export default function PatternClientPage() {
//   const params = useParams();
//   const id = params.id; // 바로 id를 꺼내 쓸 수 있음
//   return <div>현재 ID: {id}</div>;
// }
