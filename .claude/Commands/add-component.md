---
description: '새로운 React 컴포넌트를 components/ 폴더에 생성합니다'
argument-hint: '컴포넌트 이름 (예: Button, Card, UserProfile)'
allowed-tools:
  [
    'Bash(mkdir:*)',
    'Bash(cat:*)',
    'Write',
  ]
---

# Claude 명령어: Add Component

새로운 React 함수형 컴포넌트를 `components/` 폴더에 자동으로 생성합니다.

## 사용법

```
/add-component <컴포넌트-이름>
```

**예시:**
```
/add-component Button
/add-component UserCard
/add-component Dashboard
```

## 생성되는 파일

- **위치:** `components/<컴포넌트-이름>.tsx`
- **템플릿:** TypeScript, React 함수형 컴포넌트
- **스타일:** Tailwind CSS
- **포함사항:**
  - Props 인터페이스
  - `cn()` 유틸리티 import
  - className 병합 지원

## 생성된 컴포넌트 구조

```typescript
"use client";
import { cn } from "@/lib/utils";

interface ComponentProps {
  className?: string;
  // 추가 props...
}

/**
 * 컴포넌트 설명
 */
export function ComponentName({ className, ...props }: ComponentProps) {
  return (
    <div className={cn("base-styles", className)}>
      {/* 컨텐츠 */}
    </div>
  );
}
```

## 참고사항

- 컴포넌트 이름은 PascalCase로 자동 변환됩니다
- 파일명은 컴포넌트 이름과 동일합니다 (예: `Button.tsx`)
- Atomic Design 폴더 구조는 필요시 수동으로 정리하세요
- 생성 후 필요에 따라 Props를 추가하고 로직을 구현하세요
