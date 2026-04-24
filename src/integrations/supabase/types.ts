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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      borrower_logins: {
        Row: {
          fingerprint_id: string | null
          id: string
          ip_address: string | null
          logged_in_at: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          fingerprint_id?: string | null
          id?: string
          ip_address?: string | null
          logged_in_at?: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          fingerprint_id?: string | null
          id?: string
          ip_address?: string | null
          logged_in_at?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      closing_bids: {
        Row: {
          application_id: string
          bid_amount: number
          created_at: string
          id: string
          investor_label: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          application_id: string
          bid_amount?: number
          created_at?: string
          id?: string
          investor_label: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          bid_amount?: number
          created_at?: string
          id?: string
          investor_label?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "closing_bids_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      closing_checklist_items: {
        Row: {
          application_id: string
          category: string
          completed_at: string | null
          completed_by: string | null
          created_at: string
          deadline: string | null
          id: string
          is_completed: boolean | null
          notes: string | null
          title: string
          updated_at: string
        }
        Insert: {
          application_id: string
          category?: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          category?: string
          completed_at?: string | null
          completed_by?: string | null
          created_at?: string
          deadline?: string | null
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "closing_checklist_items_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      closing_documents: {
        Row: {
          application_id: string
          audit_trail: Json | null
          created_at: string
          esign_completed_at: string | null
          esign_status: string | null
          file_name: string
          file_size: number | null
          file_type: string | null
          file_url: string
          id: string
          uploaded_by: string
          uploaded_by_role: string
        }
        Insert: {
          application_id: string
          audit_trail?: Json | null
          created_at?: string
          esign_completed_at?: string | null
          esign_status?: string | null
          file_name: string
          file_size?: number | null
          file_type?: string | null
          file_url: string
          id?: string
          uploaded_by: string
          uploaded_by_role?: string
        }
        Update: {
          application_id?: string
          audit_trail?: Json | null
          created_at?: string
          esign_completed_at?: string | null
          esign_status?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string | null
          file_url?: string
          id?: string
          uploaded_by?: string
          uploaded_by_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "closing_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      closing_messages: {
        Row: {
          application_id: string
          audio_url: string | null
          content: string | null
          created_at: string
          id: string
          is_read: boolean | null
          message_type: string
          sender_id: string
          sender_role: string
          transcript: string | null
        }
        Insert: {
          application_id: string
          audio_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string
          sender_id: string
          sender_role?: string
          transcript?: string | null
        }
        Update: {
          application_id?: string
          audio_url?: string | null
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean | null
          message_type?: string
          sender_id?: string
          sender_role?: string
          transcript?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "closing_messages_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      closing_payments: {
        Row: {
          amount: number
          application_id: string
          created_at: string
          description: string
          due_date: string | null
          escrow_balance: number | null
          id: string
          paid_at: string | null
          payment_type: string
          status: string
          updated_at: string
          wire_reference: string | null
        }
        Insert: {
          amount?: number
          application_id: string
          created_at?: string
          description: string
          due_date?: string | null
          escrow_balance?: number | null
          id?: string
          paid_at?: string | null
          payment_type?: string
          status?: string
          updated_at?: string
          wire_reference?: string | null
        }
        Update: {
          amount?: number
          application_id?: string
          created_at?: string
          description?: string
          due_date?: string | null
          escrow_balance?: number | null
          id?: string
          paid_at?: string | null
          payment_type?: string
          status?: string
          updated_at?: string
          wire_reference?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "closing_payments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      document_uploads: {
        Row: {
          created_at: string
          document_name: string
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string | null
          id: string
          notes: string | null
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
          user_id?: string | null
        }
        Relationships: []
      }
      draw_schedules: {
        Row: {
          application_id: string
          approved_amount: number | null
          approved_at: string | null
          created_at: string
          description: string
          draw_number: number
          funded_at: string | null
          id: string
          notes: string | null
          requested_amount: number
          requested_at: string
          status: string
          updated_at: string
        }
        Insert: {
          application_id: string
          approved_amount?: number | null
          approved_at?: string | null
          created_at?: string
          description: string
          draw_number?: number
          funded_at?: string | null
          id?: string
          notes?: string | null
          requested_amount?: number
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          application_id?: string
          approved_amount?: number | null
          approved_at?: string | null
          created_at?: string
          description?: string
          draw_number?: number
          funded_at?: string | null
          id?: string
          notes?: string | null
          requested_amount?: number
          requested_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "draw_schedules_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      loan_program_applications: {
        Row: {
          application_type: string | null
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          created_at: string
          id: string
          loan_id: string | null
          loan_purpose: string | null
          program_id: string
          program_name: string
          program_specific_data: Json | null
          property_address: string | null
          property_city: string | null
          property_state: string | null
          property_zip: string | null
          requested_amount: number | null
          status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          application_type?: string | null
          borrower_email: string
          borrower_name: string
          borrower_phone: string
          created_at?: string
          id?: string
          loan_id?: string | null
          loan_purpose?: string | null
          program_id: string
          program_name: string
          program_specific_data?: Json | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_zip?: string | null
          requested_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          application_type?: string | null
          borrower_email?: string
          borrower_name?: string
          borrower_phone?: string
          created_at?: string
          id?: string
          loan_id?: string | null
          loan_purpose?: string | null
          program_id?: string
          program_name?: string
          program_specific_data?: Json | null
          property_address?: string | null
          property_city?: string | null
          property_state?: string | null
          property_zip?: string | null
          requested_amount?: number | null
          status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      loan_repayments: {
        Row: {
          application_id: string
          created_at: string
          due_date: string
          id: string
          interest: number
          paid_at: string | null
          payment_number: number
          principal: number
          remaining_balance: number | null
          status: string
          total_amount: number
        }
        Insert: {
          application_id: string
          created_at?: string
          due_date: string
          id?: string
          interest?: number
          paid_at?: string | null
          payment_number?: number
          principal?: number
          remaining_balance?: number | null
          status?: string
          total_amount?: number
        }
        Update: {
          application_id?: string
          created_at?: string
          due_date?: string
          id?: string
          interest?: number
          paid_at?: string | null
          payment_number?: number
          principal?: number
          remaining_balance?: number | null
          status?: string
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "loan_repayments_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      post_close_documents: {
        Row: {
          application_id: string
          archived_at: string | null
          created_at: string
          description: string | null
          document_type: string
          file_name: string
          file_url: string
          id: string
          is_archived: boolean | null
        }
        Insert: {
          application_id: string
          archived_at?: string | null
          created_at?: string
          description?: string | null
          document_type?: string
          file_name: string
          file_url: string
          id?: string
          is_archived?: boolean | null
        }
        Update: {
          application_id?: string
          archived_at?: string | null
          created_at?: string
          description?: string | null
          document_type?: string
          file_name?: string
          file_url?: string
          id?: string
          is_archived?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "post_close_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "loan_program_applications"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          phone: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_application_email: { Args: { _email: string }; Returns: boolean }
      get_borrower_display_name: {
        Args: { _email: string; _loan_id: string }
        Returns: string
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      link_application_to_user: {
        Args: { _email: string; _loan_id: string; _user_id: string }
        Returns: Json
      }
      verify_loan_id: {
        Args: { _email: string; _loan_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "borrower" | "loan_officer"
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
    Enums: {
      app_role: ["admin", "moderator", "borrower", "loan_officer"],
    },
  },
} as const
