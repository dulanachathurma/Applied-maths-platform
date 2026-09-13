export const dictionaries = {
  en: {
    nav: {
      courses: "Courses",
      about: "About Dulana",
      dashboard: "Dashboard",
      signOut: "Sign out",
      logIn: "Log in",
      signUp: "Sign up"
    },
    home: {
      heroTitle1: "Master A/L Applied Mathematics",
      heroTitle2: "With Confidence",
      heroSubtitle: "Join the most comprehensive online platform designed specifically for Sri Lankan A/L students. Learn from the best, practice with real exam questions, and achieve your dream results.",
      getStarted: "Get Started Now",
      browseCourses: "Browse Courses",
      stats: {
        students: "Active Students",
        courses: "Premium Courses",
        success: "Success Rate"
      }
    }
  },
  si: {
    nav: {
      courses: "පාඨමාලා",
      about: "දුලන ගැන",
      dashboard: "පුවරුව",
      signOut: "ඉවත් වන්න",
      logIn: "පිවිසෙන්න",
      signUp: "ලියාපදිංචි වන්න"
    },
    home: {
      heroTitle1: "උසස් පෙළ ව්‍යවහාරික ගණිතය",
      heroTitle2: "විශ්වාසයෙන් ජයගන්න",
      heroSubtitle: "ශ්‍රී ලාංකීය උසස් පෙළ සිසුන් සඳහාම නිර්මාණය කර ඇති සවිස්තරාත්මකම මාර්ගගත වේදිකාවට එක්වන්න. හොඳම අයගෙන් ඉගෙන ගන්න, සැබෑ විභාග ප්‍රශ්න සමඟ පුහුණු වන්න, සහ ඔබේ සිහින ප්‍රතිඵල ලබා ගන්න.",
      getStarted: "දැන්ම අරඹන්න",
      browseCourses: "පාඨමාලා බලන්න",
      stats: {
        students: "සක්‍රීය සිසුන්",
        courses: "වාරික පාඨමාලා",
        success: "සාර්ථකත්ව අනුපාතය"
      }
    }
  },
  ta: {
    nav: {
      courses: "பாடநெறிகள்",
      about: "துலன பற்றி",
      dashboard: "கட்டுப்பாட்டுப் பலகம்",
      signOut: "வெளியேறு",
      logIn: "உள்நுழைக",
      signUp: "பதிவு செய்க"
    },
    home: {
      heroTitle1: "உயர்தர பிரயோக கணிதத்தை",
      heroTitle2: "நம்பிக்கையுடன் வெல்லுங்கள்",
      heroSubtitle: "இலங்கை உயர்தர மாணவர்களுக்காக சிறப்பாக வடிவமைக்கப்பட்ட மிக விரிவான ஆன்லைன் தளத்தில் இணையுங்கள். சிறந்தவர்களிடம் கற்றுக் கொள்ளுங்கள், உண்மையான பரீட்சை கேள்விகளுடன் பயிற்சி செய்யுங்கள், உங்கள் கனவு முடிவுகளை அடையுங்கள்.",
      getStarted: "இப்போதே தொடங்குங்கள்",
      browseCourses: "பாடநெறிகளை உலாவுக",
      stats: {
        students: "செயலில் உள்ள மாணவர்கள்",
        courses: "பிரீமியம் பாடநெறிகள்",
        success: "வெற்றி விகிதம்"
      }
    }
  }
};

export type Language = 'en' | 'si' | 'ta';
export type Dictionary = typeof dictionaries.en;
