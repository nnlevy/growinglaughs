# Sprig — the Giggle Sprout · growinglaughs.com

Mascot for the "Duolingo meets Headspace for humor" concept: a comedy-skill coach who laughs with you, celebrates streaks, and dozes off when you're away.

## Files

| File | Use |
|---|---|
| `gigglesprout-interactive.html` | Interactive mascot + demo page. Everything between the `EMBEDDABLE MASCOT` CSS comment and `</script>` is the drop-in component. |
| `logo-full.svg` | Full-color mascot + wordmark lockup (headers, OG images) |
| `logo-mono.svg` | Single-color outline (footer, print, dark mode via `fill` swap) |
| `favicon.svg` | 64×64 simplified face on brand-green tile |

## Behaviors (built-in)

- **Eye tracking** — pupils follow the cursor anywhere on the page
- **Autonomous blinking** — randomized 1.8–5s intervals
- **Hover** — leaves perk up, smile widens
- **Laughter ladder** — each click within 2.5s escalates one level:

| Lv | Name | Animation |
|---|---|---|
| 1 | Chuckle | two polite bounces, "heh" particles |
| 2 | Giggle | squash-and-stretch, ^‿^ eyes, leaf shake |
| 3 | Cracking up | frantic bounce, tear streaks + falling drops |
| 4 | ROFL | rocking + clutching stomach (arms appear), tears pool into a **puddle**, "ow ow my stomach" |
| 5 | Heli-LOL | leaves spin into a **rotor**, Sprig lifts off and hovers, tears rain from above, lands |

- **Idle 20s** — falls asleep (droopy lids, Zzz); any mouse/key wakes him
- **Sound** — synthesized giggle via Web Audio, **off by default**, no audio files needed

## JS API (`window.GiggleSprout`)

```js
GiggleSprout.laugh();      // escalating (streak-based)
GiggleSprout.laugh(3);     // jump straight to a level 1–5
GiggleSprout.grow();       // spring-up growth spurt, new bud leaf pops (map to skill level-ups)
GiggleSprout.celebrate();  // jump + confetti + coach line (streaks, lesson complete)
GiggleSprout.say('Day 5 streak!', 3000); // speech bubble, optional ms
GiggleSprout.setMood('idle'|'happy'|'sleepy');
GiggleSprout.toggleSound();
```

Suggested wiring: joke rated funny → `laugh(rating)`; lesson complete → `celebrate()`; skill tier up → `grow()`; daily prompt → `say()`.

## Brand tokens

```css
--gl-green:#3FBF4E; --gl-green-dark:#2E9E3C; --gl-leaf:#57D463;
--gl-belly:#B9EFAB; --gl-sun:#FFC93C; --gl-ink:#26332B;
--gl-cream:#FFF9EC; --gl-blush:#FF9FB1;
```

## Embedding

Copy the `.gs-*` CSS block, the `<div class="gs-stage">…</div>` markup, and the IIFE script into any page (or a Cloudflare Worker-served static asset). No dependencies, ~9 KB total. Size via the `.gs-stage` width. For React later, the IIFE ports directly into a `useEffect`.
