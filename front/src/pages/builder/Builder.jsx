import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

function Builder() {

    const fonts = [
        { value: "abeezee",    label: "ABeeZee" },
        { value: "alumni",     label: "Alumni Sans" },
        { value: "bodoni",     label: "Bodoni Moda" },
        { value: "cormorant",  label: "Cormorant" },
        { value: "epilogue",   label: "Epilogue" },
        { value: "fraunces",   label: "Fraunces" },
        { value: "geologica",  label: "Geologica" },
        { value: "spartan",    label: "League Spartan" },
        { value: "newsreader", label: "Newsreader" },
        { value: "rationale",  label: "Rationale" },
        { value: "spectral",   label: "Spectral" },
    ];


    return (

        <div className="flex flex-col border rounded-md p-6 max-h-full h-full">

            <h1 className="text-white">This is the Dashboard</h1>
            <div>
                <form 
                    className="flex flex-col gap-5"
                >
                    <div className="flex gap-5">
                        <div className="flex flex-col">
                            <label htmlFor="">
                                Select your template
                            </label>
                            <select name="" id="">
                                <option value="1">Template 1</option>
                                <option value="2">Template 2</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="">
                                Ready to show your Portfolio to the world?
                            </label>
                            
                            <select name="" id="">

                                <option value="1">Yes, I'm ready</option>
                                <option value="0">No, i'm shy</option>

                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                            
                        <h2>Select your Font families here:</h2>
                        
                        <div className="flex gap-5">

                            <div className="flex flex-col">

                                <select {...register("font_navbar")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>

                            </div>

                            <div className="flex flex-col">
                                <select {...register("font_main")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <select {...register("font_footer")}>
                                    {fonts.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                                </select>
                            </div>
                        </div>    
                    </div>

                    
                    
                    <div className="flex flex-col">

                        <label htmlFor="">
                            Portfolio Name
                        </label>

                        <input type="text" />

                    </div>
                    <div className="flex flex-col">

                        <label htmlFor="">
                            Title
                        </label>

                        <input type="text" />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="">
                            About you
                        </label>

                        <input type="text" />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="">
                            Upload you CV
                        </label>

                        <input type="text" />

                    </div>

                    <div className="flex flex-col">

                        <label htmlFor="">
                            something
                        </label>

                        <input type="text" />

                    </div>



                </form>
            </div>

        </div>

    );
}

export default Builder;
