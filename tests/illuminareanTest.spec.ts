import { test, expect } from '@playwright/test';

test('illuminarean Test', async ({ page }) => {
  await page.goto('https://illuminarean.com/');

  // 모달 팝업 닫기
  if (await page.getByLabel('company:close_modal').isVisible())
  {
    await page.getByLabel('company:close_modal').click();
  }

  // Work 탭 클릭
  await page.getByLabel('a11y:Work').click();

  // GOODVIBE WORKS 바로가기 클릭
  const gvwPagePromise = page.waitForEvent('popup');
  await page.getByRole('link', { name: /\W*(GOODVIBE WORKS)\W*$/ }).click();
  const gvwPage = await gvwPagePromise;

  // 무료체험신청 클릭
  await gvwPage.getByRole('button', { name: '무료 체험 신청' }).nth(0).click();

  // ------------------- 양식 입력 -------------------
  // 회사명
  await gvwPage.locator('#companyName').click();
  await gvwPage.locator('#companyName').fill('TestCompany');

  // 대표자명
  await gvwPage.locator('#ceoName').click();
  await gvwPage.locator('#ceoName').fill('성영창');

  // 사업자 유형(Drop down)
  await gvwPage.locator('#businessType div').first().click();
  await gvwPage.getByText('법인', { exact: true }).click();
  await gvwPage.locator('#businessType div').first().click();
  await gvwPage.getByText('개인', { exact: true }).click();

  // 직원수(Drop down)
  await gvwPage.locator('#scale div').first().click();
  await gvwPage.locator('#scale div').filter({ hasText: /^(6-20)\W*$/ }).first().click();
  
  // 담당자명
  await gvwPage.locator('#name').click();
  await gvwPage.locator('#name').fill('성영창');

  // 이메일
  await gvwPage.locator('#email').click();
  await gvwPage.locator('#email').fill('goolb3m@naver.com');

  // 휴대폰 번호
  await gvwPage.locator('#mobile').click();
  await gvwPage.locator('#mobile').fill('01050499971');

  // 담당 업무
  //  - 검색
  await gvwPage.locator('button').filter({ hasText: '담당 업무를 1개 이상 선택해주세요.' }).click();
  await gvwPage.getByPlaceholder('업무명 검색').click();
  await gvwPage.getByPlaceholder('업무명 검색').fill('콘텐츠');
  await gvwPage.getByText('콘텐츠제작').click();
  await gvwPage.getByText('등록', { exact: true }).click();
  //  - 일반 선택
  await gvwPage.locator('button').filter({ hasText: '담당 업무를 1개 이상 선택해주세요.' }).click();
  await gvwPage.getByText('콘텐츠기획').click();
  await gvwPage.getByText('등록', { exact: true }).click();

  // 서비스 이용약관, 개인정보 취급방침 동의(체크박스)
  await gvwPage.locator('label').filter({ hasText: '서비스 이용약관 동의' }).click();
  await gvwPage.locator('label').filter({ hasText: '개인정보 취급방침 동의' }).click();

  // 신청 취소
  await gvwPage.locator('button').filter({ hasText: '신청 취소' }).click();
  await gvwPage.getByText('확인', { exact: true }).click();
});