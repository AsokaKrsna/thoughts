// Manually curated tag colors (hue values for HSL)
const manualTagColors = {
    cybersecurity: { hue: 210, label: 'Cybersecurity' },
    ai: { hue: 280, label: 'AI' },
    llm: { hue: 270, label: 'LLM' },
    certification: { hue: 160, label: 'Certification' },
    sal1: { hue: 170, label: 'SAL1' },
    tryhackme: { hue: 140, label: 'TryHackMe' },
    personal: { hue: 30, label: 'Personal' },
    ethics: { hue: 340, label: 'Ethics' },
    welcome: { hue: 200, label: 'Welcome' },
    openai: { hue: 150, label: 'OpenAI' },
    google: { hue: 45, label: 'Google' },
    deepmind: { hue: 220, label: 'DeepMind' },
    anthropic: { hue: 25, label: 'Anthropic' },
    claude: { hue: 35, label: 'Claude' },
    chatgpt: { hue: 155, label: 'ChatGPT' },
};

// Generate a deterministic hue from a string (for tags not in the manual list)
function stringToHue(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
}

export function getTagColor(tag) {
    const normalized = tag.toLowerCase();
    if (manualTagColors[normalized]) {
        return manualTagColors[normalized].hue;
    }
    return stringToHue(normalized);
}

export function getTagStyle(tag, opacity = 0.15) {
    const hue = getTagColor(tag);
    return {
        backgroundColor: `hsla(${hue}, 70%, 60%, ${opacity})`,
        borderColor: `hsla(${hue}, 70%, 60%, ${opacity + 0.1})`,
        color: `hsl(${hue}, 70%, 75%)`,
    };
}

export function getTagGlow(tag) {
    const hue = getTagColor(tag);
    return `radial-gradient(ellipse at 50% 0%, hsla(${hue}, 60%, 50%, 0.08) 0%, transparent 70%)`;
}

// Get the primary tag's hue for a post (first tag)
export function getPrimaryHue(tags) {
    if (!tags || tags.length === 0) return 210;
    return getTagColor(tags[0]);
}
