import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = "Asokakrsna's Thoughts";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'linear-gradient(135deg, #0a0a0b 0%, #111827 50%, #0a0a0b 100%)',
                    fontFamily: 'monospace',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '16px',
                    }}
                >
                    <div
                        style={{
                            fontSize: 72,
                            fontWeight: 800,
                            color: '#fff',
                            letterSpacing: '-0.03em',
                        }}
                    >
                        {'>'}_thoughts
                    </div>
                    <div
                        style={{
                            fontSize: 24,
                            color: '#a1a1aa',
                            letterSpacing: '0.05em',
                        }}
                    >
                        CYBERSECURITY · AI · TECHNOLOGY
                    </div>
                    <div
                        style={{
                            marginTop: 24,
                            fontSize: 18,
                            color: '#3b82f6',
                        }}
                    >
                        asokakrsna.vercel.app
                    </div>
                </div>
            </div>
        ),
        { ...size }
    );
}
