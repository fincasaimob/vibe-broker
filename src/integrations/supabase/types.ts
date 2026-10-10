export type Database = {
  public: {
    Tables: {
      partners: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          cities: string[];
          focus: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          cities: string[];
          focus?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          cities?: string[];
          focus?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      instagram_posts: {
        Row: {
          id: string;
          url: string;
          title: string;
          tag: string | null;
          image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          url: string;
          title: string;
          tag?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          url?: string;
          title?: string;
          tag?: string | null;
          image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};
