import React from "react";
// import css later

class Donate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    //add form validation later
    //add handleFormSubmit later

    render() {
        return (
            <div className="page-donate container mx-auto px-10 flex flex-col">
                <br />
                <p className="text-xl font-bold text-center text-green-600">
                    Yes, I wish to donate! :)
                </p>
                <br />
                <p className="text-base font-medium text-gray-700">
                    Name: {this.props.user.first_name}{" "}
                    {this.props.user.last_name}
                </p>
                {/* <form> */}
                {/* //=== Delivery Date ==== // */}
                <div className="mt-2">
                    <label
                        htmlFor="name"
                        className="text-base font-medium text-gray-700"
                    >
                        Delivery Date:
                    </label>{" "}
                    <input
                        type="date"
                        id="delivery-date"
                        name="delivery-date"
                        className="w-40 text-base border-2 border-gray-300 rounded-md"
                        value="2020-11-29" //add logic later
                        min={Date.now}
                        max="2020-12-31"
                    />
                </div>
                {/* //=== Images ==== // */}
                <div className="mt-2">
                    <label
                        htmlFor="images"
                        className="text-base font-medium text-gray-700"
                    >
                        Please upload a photo of item to be donated for
                        verification.
                    </label>

                    <input
                        type="file"
                        className="form-control-file"
                        id="images"
                        name="images"
                    />
                </div>
                {/* //=== Description ==== // */}
                <div className="mt-2">
                    <label
                        htmlFor="description"
                        className="inline-flex text-base font-medium text-gray-700"
                    >
                        Description of Item:
                    </label>{" "}
                    <textarea
                        className="mt-1 inline-flex w-full text-base border-2 border-gray-300 rounded-md"
                        id="description"
                        name="description"
                        rows="3"
                        placeholder=""
                    ></textarea>
                </div>
                {/* //=== Checkbox 1 ==== // */}
                <div className="mt-4">
                    <input
                        type="checkbox"
                        className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                        id="check-item-condition"
                        name="check-item-condition"
                    />{" "}
                    <label
                        for="check-item-condition"
                        className="text-base font-medium text-gray-700"
                    >
                        Item to be donated is in good working condition.
                    </label>
                </div>
                {/* //=== Checkbox 2 ==== // */}
                <div className="mt-2">
                    <input
                        type="checkbox"
                        className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                        id="check-delivery"
                        name="check-delivery"
                    />{" "}
                    <label
                        for="check-delivery"
                        className="text-base font-medium text-gray-700"
                    >
                        Delivery of item will be included.
                    </label>
                </div>
                {/* //=== Checkbox 3 ==== // */}
                <div className="mt-2">
                    <input
                        type="checkbox"
                        className="inline-flex h-4 w-4 border-gray-500 border-2 rounded-md"
                        id="check-tnc"
                        name="check-tnc"
                    />{" "}
                    <label
                        for="check-tnc"
                        className="text-base font-medium text-gray-700"
                    >
                        Yes, I agree to Gifthub's terms & conditions for
                        donations.
                    </label>
                </div>
                <br />
                <button
                    type="submit"
                    className="inline-flex justify-center text-white font-semibold h-10 w-24 py-2 px-4 rounded-md bg-yellow-600 hover:bg-yellow-300"
                >
                    Submit
                </button>
                {/* </form> */}
            </div>
        );
    }
}

export default Donate;
