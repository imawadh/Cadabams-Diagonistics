/**
 * Heuristic content-quality filter shared by detail pages. Returns true if a
 * string looks like real, user-readable text — rather than placeholder/junk
 * data like "dsds", "asdf", or short consonant runs typed during CMS
 * authoring.
 *
 * Rules (all must pass):
 *  - Length >= `minLen` (default 4)
 *  - Contains at least one whitespace character (multi-word), OR is a clean
 *    single word with reasonable vowel density (e.g. "Banashankari")
 *  - Vowel-to-letter ratio >= 0.20
 */
export function isMeaningfulText(
  s: string | null | undefined,
  minLen = 4,
): boolean {
  if (!s) return false;
  const trimmed = s.trim();
  if (trimmed.length < minLen) return false;

  const letters = (trimmed.match(/[a-zA-Z]/g) || []).length;
  if (letters < minLen) return false;
  const vowels = (trimmed.match(/[aeiouAEIOU]/g) || []).length;
  if (vowels < 2) return false;
  if (vowels / letters < 0.2) return false;

  const hasSpace = /\s/.test(trimmed);
  if (!hasSpace) {
    // Single-token strings must clear a higher bar: at least 2 distinct
    // vowels and 2 distinct consonants so "dsds" / "asdfg" / "qwerty" fail.
    const distinctVowels = new Set(
      trimmed.toLowerCase().match(/[aeiou]/g) || [],
    ).size;
    const distinctConsonants = new Set(
      trimmed.toLowerCase().match(/[bcdfghjklmnpqrstvwxyz]/g) || [],
    ).size;
    if (distinctVowels < 2 || distinctConsonants < 2) return false;
    // Reject 3+ consecutive consonants without an English-y break — catches
    // "dsdsd", "asdfg" style mashing while passing "Bangalore", "Health".
    if (/[bcdfghjklmnpqrstvwxyz]{4,}/i.test(trimmed)) return false;
  }
  return true;
}
