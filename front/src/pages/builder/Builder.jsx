

function Builder() {


    return (

        <div className="">

            <h1 className="text-white">This is the Dashboard</h1>
            <div>
                <form 
                    className="flex flex-col gap-5"
                >

                    <div className="flex flex-col">
                        <label htmlFor="">
                            Select your template
                        </label>
                        <select name="" id="">
                            <option value="1">Template 1</option>
                            <option value="2">Template 2</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-5">

                        <h2>Select your Font families here:</h2>

                        <div className="flex flex-col">

                            <label htmlFor="">
                                Top Content font
                            </label>

                            <select name="" id="">
                                <option value="1">Template 1</option>
                                <option value="2">Template 2</option>
                            </select>

                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">
                                Central Content font
                            </label>
                            <input type="text" />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="">
                                Bottom Content font
                            </label>
                            <input type="text" />
                        </div>
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
