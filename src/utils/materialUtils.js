import materialGroups from "../data/materialGroups.json";
import materialKo from "../data/materialsKr.json";

/** 마지막 단어 */
function getLastWord(name) {
  if (!name) return "";
  const parts = name.toLowerCase().trim().split(/\s+/);
  return parts[parts.length - 1];
}

/** 그룹 매칭 */
function matchGroup(itemName, keywords = []) {
  if (!Array.isArray(keywords)) return false;

  const words = itemName.toLowerCase().split(" ");
  const lastWord = words.at(-1);

  return keywords.some(k => {
    const keyword = k.toLowerCase();

    // 1️⃣ 마지막 단어 완전 일치 (최우선)
    if (lastWord === keyword) return true;

    // 2️⃣ 단어가 하나뿐인 경우만 허용 (ex: orange, pear)
    if (words.length === 1 && words[0] === keyword) return true;

    return false;
  });
}



/** 메인 그룹핑 */
export function groupMaterials(materials = []) {
  const { order, groups } = materialGroups;
  const used = new Set();

  const result = order
    .map(groupName => {
      if (groupName === "기타") return null;

      const keywords = groups[groupName] || [];

      const items = materials
        .filter(item => {
          if (!item?.name) return false;
          if (used.has(item.name)) return false;

          const matched = matchGroup(item.name, keywords);
          if (matched) used.add(item.name);
          return matched;
        })
        .map(item => ({
          ...item,
          koName: materialKo[item.name] ?? item.name,
        }))
        // ✅ 여기만 정렬
        .sort((a, b) => a.koName.localeCompare(b.koName, "ko"));

      return { groupName, items };
    })
    .filter(Boolean);

  // ✅ 기타 그룹 (순서는 맨 뒤 그대로)
  if (order.includes("기타")) {
    result.push({
      groupName: "기타",
      items: materials
        .filter(item => item?.name && !used.has(item.name))
        .map(item => ({
          ...item,
          koName: materialKo[item.name] ?? item.name,
        }))
        // ✅ 기타도 아이템만 정렬
        .sort((a, b) => a.koName.localeCompare(b.koName, "ko")),
    });
  }

  return result;
}

