import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const miausu: CustomThemeConfig = {
    name: 'miausu',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
        "--theme-font-family-heading": `ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif`,
        "--theme-font-color-base": "255 255 255", // Pure white text
        "--theme-font-color-dark": "200 207 213", // Light gray for darker text
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "8px",
        "--theme-border-base": "1px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255", // White on primary
        "--on-secondary": "255 255 255", // White on secondary
        "--on-tertiary": "255 255 255", // White on tertiary
        "--on-success": "255 255 255", // White on success
        "--on-warning": "255 255 255", // White on warning
        "--on-error": "255 255 255", // White on error
        "--on-surface": "255 255 255", // White on surface
        // =~= Theme Colors  =~=
        // primary | Icy Blue
        "--color-primary-50": "240 249 255", // #f0f9ff
        "--color-primary-100": "224 242 254", // #e0f2fe
        "--color-primary-200": "191 233 251", // #bfe9fb
        "--color-primary-300": "147 222 250", // #93defa
        "--color-primary-400": "100 206 249", // #64ceF9
        "--color-primary-500": "59 191 246", // #3bbff6
        "--color-primary-600": "37 165 226", // #25a5e2
        "--color-primary-700": "28 139 198", // #1c8bc6
        "--color-primary-800": "20 113 168", // #1471a8
        "--color-primary-900": "12 87 132", // #0c5784
        // secondary | Snowy Gray
        "--color-secondary-50": "250 250 250", // #fafafa
        "--color-secondary-100": "243 244 246", // #f3f4f6
        "--color-secondary-200": "229 231 235", // #e5e7eb
        "--color-secondary-300": "209 213 219", // #d1d5db
        "--color-secondary-400": "156 163 175", // #9ca3af
        "--color-secondary-500": "107 114 128", // #6b7280
        "--color-secondary-600": "75 85 99", // #4b5563
        "--color-secondary-700": "55 65 81", // #374151
        "--color-secondary-800": "31 41 55", // #1f2937
        "--color-secondary-900": "17 24 39", // #111827
        // tertiary | Frosty Cyan
        "--color-tertiary-50": "236 248 255", // #ecf8ff
        "--color-tertiary-100": "207 242 255", // #cdf2ff
        "--color-tertiary-200": "165 238 255", // #a5eefb
        "--color-tertiary-300": "112 224 255", // #70e0ff
        "--color-tertiary-400": "64 206 255", // #40ceff
        "--color-tertiary-500": "32 189 255", // #20bdff
        "--color-tertiary-600": "0 172 237", // #00aced
        "--color-tertiary-700": "0 143 209", // #008fd1
        "--color-tertiary-800": "0 114 180", // #0072b4
        "--color-tertiary-900": "0 85 150", // #005596
        // success | Minty Green
        "--color-success-50": "236 253 245", // #ecfdf5
        "--color-success-100": "209 250 229", // #d1fae5
        "--color-success-200": "167 243 208", // #a7f3d0
        "--color-success-300": "118 231 177", // #76e7b1
        "--color-success-400": "74 215 144", // #4ade90
        "--color-success-500": "34 197 94", // #22c55e
        "--color-success-600": "22 163 74", // #16a34a
        "--color-success-700": "20 140 66", // #148c42
        "--color-success-800": "16 112 56", // #107038
        "--color-success-900": "13 84 45", // #0d542d
        // warning | Pale Orange
        "--color-warning-50": "255 247 237", // #fff7ed
        "--color-warning-100": "255 237 213", // #fdecdc
        "--color-warning-200": "254 226 177", // #fee2b1
        "--color-warning-300": "253 200 118", // #fdc876
        "--color-warning-400": "251 173 52", // #fab134
        "--color-warning-500": "249 149 22", // #f99516
        "--color-warning-600": "239 122 12", // #ef7a0c
        "--color-warning-700": "217 95 10", // #d95f0a
        "--color-warning-800": "185 76 8", // #b94c08
        "--color-warning-900": "153 61 6", // #993d06
        // error | Ruby Red
        "--color-error-50": "254 242 242", // #fef2f2
        "--color-error-100": "254 226 226", // #fee2e2
        "--color-error-200": "254 202 202", // #fecaca
        "--color-error-300": "252 165 165", // #fca5a5
        "--color-error-400": "248 113 113", // #f87171
        "--color-error-500": "239 68 68", // #ef4444
        "--color-error-600": "220 38 38", // #dc2626
        "--color-error-700": "185 28 28", // #b91c1c
        "--color-error-800": "153 20 20", // #991414
        "--color-error-900": "121 12 12", // #790c0c
        // surface | Snow White
        "--color-surface-50": "255 255 255", // #ffffff
        "--color-surface-100": "250 250 250", // #fafafa
        "--color-surface-200": "243 244 246", // #f3f4f6
        "--color-surface-300": "229 231 235", // #e5e7eb
        "--color-surface-400": "209 213 219", // #d1d5db
        "--color-surface-500": "156 163 175", // #9ca3af
        "--color-surface-600": "107 114 128", // #6b7280
        "--color-surface-700": "75 85 99", // #4b5563
        "--color-surface-800": "55 65 81", // #374151
        "--color-surface-900": "28 38 48", // #1c2630
    }
};