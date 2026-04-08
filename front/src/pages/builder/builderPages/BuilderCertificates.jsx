import { uploadCertificates } from "@/api/builder";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import CertificateForm from "@/components/builder/certificates/CertificateForm";
import CertificatesAccordion from "../../../components/builder/certificates/CertificateEditForm";
import { Plus } from "lucide-react";




export default function BuilderCertificates() { 

    return (
        <div className="flex flex-col gap-5">
            
            <div>
                <h1 className="font-bold text-3xl">
                    My Certificates
                </h1>
                <CertificatesAccordion />                
            </div>

        </div>
    )

}

