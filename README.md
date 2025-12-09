# AARAA Infrastructure - Financial ERM

Premium Apple-style financial dashboard for construction project management.

## Tech Stack
- **Frontend:** React, Tailwind CSS, Lucide Icons, Recharts
- **Backend:** Supabase (Database & Auth)
- **AI:** Google Gemini API (via `@google/genai`)
- **Build Tool:** Vite

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory:
   ```env
   VITE_API_KEY=your_gemini_api_key_here
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

This project is ready for Vercel. 
1. Push to GitHub.
2. Import project in Vercel.
3. Add `VITE_API_KEY` to Vercel Environment Variables.
