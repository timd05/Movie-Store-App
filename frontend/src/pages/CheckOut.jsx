import { useState } from "react";
import { useShopContext } from "../contexts/ShopContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import MovieCard from "../components/MovieCard";
import "../css/CheckOut.css";

function CheckOut() {
    const navigate = useNavigate();
    const { shopItems } = useShopContext();
    const [step, setStep] = useState(1);

    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [stateVal, setStateVal] = useState("");

    const [DHL, setDHL] = useState(false);
    const [USPS, setUSPS] = useState(false);
    const [FedEx, setFedEx] = useState(false);
    const [UPS, setUPS] = useState(false);

    const [bankT, setbankT] = useState(false);
    const [paypal, setpaypal] = useState(false);
    const [appleP, setappleP] = useState(false);

    const [PromoCode, setPromoCode] = useState("");

    const subtotal = shopItems.length * 20;
    const total = subtotal;

    /* Back to Homepage after order has been placed */
    function OrderPlaced(){
        alert("Order placed!");
        navigate("/");
    }

    if (!shopItems || shopItems.length === 0) {
        return (
            <>
                <NavBar />
                <div className="checkout-empty">
                    <h2>Your cart is empty</h2>
                    <p>Start adding movies to your shopping cart!</p>
                </div>
            </>
        );
    }
    return (
        <>
            <NavBar />
            <div className="checkout-container">
                <div className="checkout-timeline-container">
                    <h1 id="title-checkout">Check Out</h1>
                    <hr />

                    <div className="checkout-timeline-grid">

                        <div className="timeline">
                            <p className={step === 1 ? "activeStep" : ""} style={{ gridRow: 1 }}>1</p>
                            <div className="vertikal"></div>
                            <p className={step === 2 ? "activeStep" : ""} style={{ gridRow: 2 }}>2</p>
                            <div className="vertikal"></div>
                            <p className={step === 3 ? "activeStep" : ""} style={{ gridRow: 3 }}>3</p>
                            <div className="vertikal"></div>
                            <p className={step === 4 ? "activeStep" : ""} style={{ gridRow: 4 }}>4</p>
                        </div>

                        <div className="checkout">

                            <div className={`checkout-step step1-done ${step >= 2 ? "true" : "false"}`} style={{ gridRow: 1 }}>
                                <h3 id="oswald">Shipping Address</h3>
                                    <p>* indicates required field</p>
                                    <form className={`address-form ${step === 1 ? "visible" : "hidden"}`}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if (firstName && secondName && address1 && city && stateVal && step ===1) {
                                            setStep(2);
                                        } else {
                                        alert("Please fill in all required fields.");
                                        }
                                    }}>
                                    <div className="input-firstname">
                                        <label>First Name *</label>
                                        <input type="text" className="step1-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                                    </div>
                                    <div className="input-secondname">
                                        <label>Second Name *</label>
                                        <input type="text" className="step1-input" value={secondName} onChange={(e) => setSecondName(e.target.value)} required />
                                    </div>
                                    <div className="input-addr1">
                                        <label>Address 1 *</label>
                                        <input type="text" className="step1-input" value={address1} onChange={(e) => setAddress1(e.target.value)} required />
                                    </div>
                                    <div className="input-addr2">
                                        <label>Address 2</label>
                                        <input type="text" className="step1-input" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                                    </div>
                                    <div className="input-city">
                                        <label>City *</label>
                                        <input type="text" className="step1-input" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                    <div className="input-state">
                                        <label>State *</label>
                                        <input type="text" className="step1-input" value={stateVal} onChange={(e) => setStateVal(e.target.value)} required />
                                    </div>
                                    <button className="checkout-btn" type="submit">Continue to shipping method</button>
                                </form>
                            </div>

                            <div className="checkout-step" style={{ gridRow: 2 }}>
                                <h3 id="oswald">Shipping Method</h3>
                                <form className={`shipping-form ${step === 2 ? "visible" : "hidden"}`}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if ((DHL || USPS || FedEx || UPS) && step === 2) {
                                        setStep(3);
                                        } else if (!(DHL || USPS || FedEx || UPS)) {
                                        alert("Please fill in all required fields.");
                                        }
                                    }}>
                                    <div className="shipping-container">
                                        <div className="input-dhl">
                                            <input type="checkbox" className="search-input" checked={DHL} onChange={(e) => setDHL(e.target.checked)} />
                                            <label>DHL</label>
                                        </div>
                                        <div className="input-usps">
                                            <input type="checkbox" className="search-input" checked={USPS} onChange={(e) => setUSPS(e.target.checked)} />
                                            <label>USPS</label>
                                        </div>
                                        <div className="input-fedex">
                                            <input type="checkbox" className="search-input" checked={FedEx} onChange={(e) => setFedEx(e.target.checked)} />
                                            <label>FedEx</label>
                                        </div>
                                        <div className="input-ups">
                                            <input type="checkbox" className="search-input" checked={UPS} onChange={(e) => setUPS(e.target.checked)} />
                                            <label>UPS</label>
                                        </div>
                                    </div>
                                    <div className="btn-group">
                                        <button className="checkout2-btn" onClick={() => setStep(1)}>Back</button>
                                        <button className="checkout2-btn" type="submit">Continue to payment</button>
                                    </div>
                                </form>
                            </div>

                            <div className="checkout-step" style={{ gridRow: 3 }}>
                                <h3 id="oswald">Payment</h3>
                                <form className={`shipping-form ${step === 3 ? "visible" : "hidden"}`}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        if ((bankT || paypal || appleP) && step === 3) {
                                        setStep(4);
                                        } else if (!(bankT || paypal || appleP)) {
                                        alert("Please fill in all required fields.");
                                        }
                                    }}>
                                    <div className="shipping-container">
                                        <div className="input-dhl">
                                            <input type="checkbox" className="search-input" checked={bankT} onChange={(e) => setbankT(e.target.checked)} />
                                            <label>Bank transfer</label>
                                        </div>
                                        <div className="input-usps">
                                            <input type="checkbox" className="search-input" checked={paypal} onChange={(e) => setpaypal(e.target.checked)} />
                                            <label>PayPal</label>
                                        </div>
                                        <div className="input-fedex">
                                            <input type="checkbox" className="search-input" checked={appleP} onChange={(e) => setappleP(e.target.checked)} />
                                            <label>Apple Pay</label>
                                        </div>
                                    </div>
                                    <div className="btn-group">
                                        <button className="checkout2-btn" onClick={() => setStep(2)}>Back</button>
                                        <button className="checkout2-btn" type="submit">Continue to review</button>
                                    </div>
                                </form>
                            </div>

                            <div className="checkout-step" style={{ gridRow: 4 }}>
                                <h3 id="oswald">Review & Place Order</h3>
                                <div className={`btn-group ${step === 4 ? "visible" : "hidden"}`}>
                                    <button className="checkout2-btn" onClick={() => setStep(3)}>Back</button>
                                    <button className="checkout2-btn" onClick={OrderPlaced}>Place order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkout-summary">
                    <h2 id="title-checkout" className="summary-title">Order Summary</h2>
                    <div>
                        <form className="PromoCode">
                            <label>Promo code:</label>
                            <div className="promo">
                                <input type="text" className="promo-input" value={PromoCode} onChange={(e) => setPromoCode(e.target.value)}/>
                                <button className="checkout2-btn">Redeem</button>
                            </div>
                        </form>
                    </div>
                    <div className="subtotal">
                        <p>Subtotal</p>
                        <p>{subtotal}$</p>
                    </div>
                    <div className="shipping-costs">
                        <p>Shipping</p>
                        <p>FREE</p>
                    </div>
                    <div className="taxes">
                        <p>Estimated tax</p>
                        <p>--</p>
                    </div>
                    <hr className="Line-Checkout"></hr>
                    <div className="totalAmount">
                        <h5>Total</h5>
                        <h5>{total}$</h5>
                    </div>
                    <hr className="Line-Checkout"></hr>
                    <h4>🛒 Cart ({shopItems.length} Items)</h4>
                    <div className="shopItems-container">
                        <div className="shop-grid">
                            {shopItems.map((movie)=>
                            (<div className="shop-item-container"><MovieCard movie={movie} key={movie.id}/><p className="amountItem">-20$</p></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CheckOut;