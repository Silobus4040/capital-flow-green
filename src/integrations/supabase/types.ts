export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      application_documents: {
        Row: {
          admin_notes: string | null
          admin_reviewed: boolean | null
          application_id: string
          created_at: string
          document_name: string
          document_type: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          mime_type: string | null
          updated_at: string
          upload_status: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          admin_reviewed?: boolean | null
          application_id: string
          created_at?: string
          document_name: string
          document_type?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          upload_status?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          admin_reviewed?: boolean | null
          application_id?: string
          created_at?: string
          document_name?: string
          document_type?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          mime_type?: string | null
          updated_at?: string
          upload_status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_application_documents_application_id"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
        }
        Relationships: []
      }
      conversations: {
        Row: {
          borrower_id: string | null
          created_at: string
          id: string
          last_message_at: string | null
          loan_application_id: string | null
          status: string
          updated_at: string
        }
        Insert: {
          borrower_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          loan_application_id?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          borrower_id?: string | null
          created_at?: string
          id?: string
          last_message_at?: string | null
          loan_application_id?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_loan_application_id_fkey"
            columns: ["loan_application_id"]
            isOneToOne: false
            referencedRelation: "loan_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      document_submissions: {
        Row: {
          created_at: string
          document_name: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          notes: string | null
          upload_slot: number | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          document_name: string
          file_name: string
          file_path: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          notes?: string | null
          upload_slot?: number | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          document_name?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string | null
          id?: string
          notes?: string | null
          upload_slot?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      draw_requests: {
        Row: {
          contractor_email: string | null
          contractor_name: string | null
          contractor_phone: string | null
          created_at: string
          draw_number: number
          id: string
          invoice_amount: number | null
          notes: string | null
          percentage_complete: number | null
          project_name: string
          requested_amount: number
          status: string | null
          updated_at: string
          user_id: string | null
          work_completed: string
        }
        Insert: {
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          created_at?: string
          draw_number: number
          id?: string
          invoice_amount?: number | null
          notes?: string | null
          percentage_complete?: number | null
          project_name: string
          requested_amount: number
          status?: string | null
          updated_at?: string
          user_id?: string | null
          work_completed: string
        }
        Update: {
          contractor_email?: string | null
          contractor_name?: string | null
          contractor_phone?: string | null
          created_at?: string
          draw_number?: number
          id?: string
          invoice_amount?: number | null
          notes?: string | null
          percentage_complete?: number | null
          project_name?: string
          requested_amount?: number
          status?: string | null
          updated_at?: string
          user_id?: string | null
          work_completed?: string
        }
        Relationships: []
      }
      loan_applications: {
        Row: {
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          city: string
          created_at: string
          detailed_status: string | null
          id: string
          last_status_update: string | null
          loan_amount: number
          loan_program: string
          project_address: string
          project_description: string | null
          project_name: string
          property_type: string
          state: string
          status: string | null
          status_notes: string | null
          updated_at: string
          user_id: string | null
          zip_code: string
        }
        Insert: {
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          city: string
          created_at?: string
          detailed_status?: string | null
          id?: string
          last_status_update?: string | null
          loan_amount: number
          loan_program: string
          project_address: string
          project_description?: string | null
          project_name: string
          property_type: string
          state: string
          status?: string | null
          status_notes?: string | null
          updated_at?: string
          user_id?: string | null
          zip_code: string
        }
        Update: {
          borrower_email?: string
          borrower_name?: string
          borrower_phone?: string
          city?: string
          created_at?: string
          detailed_status?: string | null
          id?: string
          last_status_update?: string | null
          loan_amount?: number
          loan_program?: string
          project_address?: string
          project_description?: string | null
          project_name?: string
          property_type?: string
          state?: string
          status?: string | null
          status_notes?: string | null
          updated_at?: string
          user_id?: string | null
          zip_code?: string
        }
        Relationships: []
      }
      loan_program_applications: {
        Row: {
          admin_notes: string | null
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          created_at: string
          id: string
          last_status_update: string | null
          loan_purpose: string | null
          program_id: string
          program_name: string
          program_specific_data: Json | null
          property_address: string | null
          property_city: string | null
          property_state: string | null
          property_zip: string | null
          requested_amount: number | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          created_at?: string
          id?: string
          last_status_update?: string | null
          loan_purpose?: string | null
          program_id: string
          program_name: string
          program_specific_data?: Json | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_zip?: string | null
          requested_amount?: number | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          borrower_email?: string
          borrower_name?: string
          borrower_phone?: string
          created_at?: string
          id?: string
          last_status_update?: string | null
          loan_purpose?: string | null
          program_id?: string
          program_name?: string
          program_specific_data?: Json | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_zip?: string | null
          requested_amount?: number | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          conversation_id: string
          created_at: string
          file_name: string | null
          file_path: string | null
          file_size: number | null
          id: string
          message_type: string
          sender_id: string | null
          sender_type: string
          updated_at: string
          voice_duration: number | null
        }
        Insert: {
          content?: string | null
          conversation_id: string
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          message_type: string
          sender_id?: string | null
          sender_type: string
          updated_at?: string
          voice_duration?: number | null
        }
        Update: {
          content?: string | null
          conversation_id?: string
          created_at?: string
          file_name?: string | null
          file_path?: string | null
          file_size?: number | null
          id?: string
          message_type?: string
          sender_id?: string | null
          sender_type?: string
          updated_at?: string
          voice_duration?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          role: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      referral_signups: {
        Row: {
          company: string | null
          created_at: string
          email: string
          experience_level: string | null
          full_name: string
          id: string
          phone: string | null
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          experience_level?: string | null
          full_name: string
          id?: string
          phone?: string | null
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          experience_level?: string | null
          full_name?: string
          id?: string
          phone?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
