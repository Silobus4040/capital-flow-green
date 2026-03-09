import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        const body = await req.json();
        const { applicationData, userId } = body;

        if (!applicationData || !applicationData.programId) {
            throw new Error("Missing application data");
        }

        // Insert user into loan_program_applications bypassing RLS
        const { data, error } = await supabaseClient
            .from("loan_program_applications")
            .insert({
                user_id: userId || null,
                program_id: applicationData.programId,
                program_name: applicationData.programName,
                borrower_name: applicationData.borrowerName,
                borrower_email: applicationData.borrowerEmail,
                borrower_phone: applicationData.borrowerPhone,
                property_address: applicationData.propertyAddress,
                property_city: applicationData.propertyCity,
                property_state: applicationData.propertyState,
                property_zip: applicationData.propertyZip,
                requested_amount: applicationData.requestedAmount,
                loan_purpose: applicationData.loanPurpose,
                program_specific_data: applicationData.programSpecificData || {},
            })
            .select()
            .single();

        if (error) {
            console.error("Database insert error:", error);
            throw error;
        }

        return new Response(JSON.stringify({ success: true, data }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    } catch (error: any) {
        console.error("Error submitting application:", error);
        return new Response(
            JSON.stringify({ success: false, error: error.message }),
            {
                headers: { ...corsHeaders, "Content-Type": "application/json" },
                status: 400,
            }
        );
    }
});
