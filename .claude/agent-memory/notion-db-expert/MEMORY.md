# Notion DB Expert Memory

## 프로젝트 Notion 데이터베이스 구조

### Invoice_DB (견적서)
- Database ID: `30bae03ae610809c83dae2a232f7ce25`
- 속성: 이름(title), quoteNumber(rich_text), clientName(rich_text), clientCompany(rich_text), issueDate(date), validUntil(date), status(select: draft/sent/accepted/rejected), taxRate(number/percent), notes(rich_text), issuerName(rich_text), issuerContact(rich_text)

### Items_DB (견적 항목)
- Database ID: `30bae03ae61080fe8235ed5a1dc9b7af`
- 속성: 이름(title), quoteId(relation -> Invoice_DB), unitPrice(number), quantity(number), amount(formula: unitPrice * quantity), order(number)
- relation은 single_property 모드로 설정됨

## Notion API 팁 (이 프로젝트)
- @notionhq/client SDK 설치 완료 (node_modules에 존재)
- SDK의 `databases.update()` 결과에서 properties가 누락되는 경우 있음 -> 직접 fetch 사용이 더 안정적
- notionVersion: '2022-06-28'이 현재 프로젝트 SDK에서 사용 가능
- `.env.local`에 NOTION_API_KEY, NOTION_QUOTE_DATABASE_ID 설정됨
- Items_DB ID는 아직 .env.local에 미설정 (필요 시 NOTION_ITEMS_DATABASE_ID 추가)

## 환경 관련
- Windows 11, bash 셸 사용
- Node.js v24.13.1 (eval 시 backslash escaping 주의 -> .mjs 파일로 작성 권장)
- mcp-cli가 PATH에 없음 -> Notion MCP 도구는 bash에서 직접 사용 불가, fetch 또는 SDK 사용
