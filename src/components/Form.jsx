import React, { useState } from 'react'; // Added React and useState
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import backgroundImageForm from "../assets/background-products-form.jpg";

const Form = () => {
  // --- Start of Functional Changes ---
  const initialFormData = {
    firstName: '',
    lastName: '',
    location: '',
    email: '',
    coffeeType: 'Arabica', // Default value to match first option
    roast: 'Light Roast',  // Default value to match first option
    additionalNotes: '', // Changed from 'textarea' to match backend schema
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ message: '', type: '' }); // type: 'success' or 'error'

  const handleChange = (e) => {
    // Use 'id' to map to state keys to keep original HTML structure as much as possible
    // Or add 'name' attributes that match state keys. Let's add 'name' for clarity.
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    setSubmitStatus({ message: '', type: '' });

  // Validation (using formData state)
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.location ||
      !formData.email ||
      !formData.coffeeType ||
      !formData.roast
      // additionalNotes is optional, so not included in required check unless specified
    ) {
      // Using alert for now to match original feedback style, can be changed
      alert("Please fill in all required fields!");
      // Or update submitStatus:
      // setSubmitStatus({ message: 'Please fill in all required fields!', type: 'error' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Ensure field names here match your backend Order model
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          location: formData.location,
          email: formData.email,
          coffeeType: formData.coffeeType,
          roast: formData.roast,
          additionalNotes: formData.additionalNotes, // Ensure backend expects 'additionalNotes'
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ message: 'Order submitted successfully!', type: 'success' });
        setFormData(initialFormData); // Reset form
        // Optionally, alert the success message too if you prefer alerts
        // alert('Order submitted successfully!');
      } else {
        setSubmitStatus({ message: result.message || 'Failed to submit order.', type: 'error' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({ message: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };
  // --- End of Functional Changes ---

  // Animation: fade-in-on-scroll (Original code)
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    delay: 50,
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  const animation1 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    delay: 100,
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  return (
    <>
      <animated.div style={animation} ref={ref}>
        <div
          className="container-fluid form-products"
          style={{
            backgroundImage: `url(${backgroundImageForm})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="row form-wrapper">
            <div className="col-md-12 col-sm-12 form-content-wrapper">
              <animated.div style={animation1} ref={ref}> {/* Note: Using ref on two animated divs might be unintentional, but kept as is */}
                {/* --- Feedback Message Display --- */}
                {submitStatus.message && (
                  <div
                    style={{
                      padding: '10px',
                      margin: '10px auto', // Centered with some margin
                      maxWidth: '80%', // To prevent it from being too wide
                      borderRadius: '5px',
                      textAlign: 'center',
                      color: 'white', // Assuming dark background, light text for feedback
                      backgroundColor: submitStatus.type === 'success' ? 'green' : 'red',
                      fontFamily: '"Orbitron", sans-serif', // Match form font
                    }}
                  >
                    {submitStatus.message}
                  </div>
                )}
                {/* --- End Feedback Message Display --- */}
                <form
                  onSubmit={handleSubmit} // Changed from onClick on button to onSubmit on form
                  className="form-contents bg-dark"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  <h2 className="md-title text-center text-white pb-3">
                    Ready for a taste of Aztek Coffee?
                    <br />
                    Place your order now!
                  </h2>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="firstName" // Added name attribute
                      placeholder="Enter your first name"
                      value={formData.firstName} // Controlled component
                      onChange={handleChange}     // Controlled component
                      required // Added for basic browser validation
                    />
                  </div>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      name="lastName" // Added name attribute
                      placeholder="Enter your last name"
                      value={formData.lastName} // Controlled component
                      onChange={handleChange}    // Controlled component
                      required
                    />
                  </div>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      name="location" // Added name attribute
                      placeholder="Enter your location"
                      value={formData.location} // Controlled component
                      onChange={handleChange}     // Controlled component
                      required
                    />
                  </div>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email" // Added name attribute
                      placeholder="Enter your email address"
                      value={formData.email} // Controlled component
                      onChange={handleChange}  // Controlled component
                      required
                    />
                  </div>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="coffeeType">Select Coffee Type</label>
                    <select
                      className="form-control"
                      id="coffeeType"
                      name="coffeeType" // Added name attribute
                      value={formData.coffeeType} // Controlled component
                      onChange={handleChange}     // Controlled component
                      required
                    >
                      <option value="Arabica">Arabica</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Blend Aztek">Aztek</option>
                      <option value="Brazil">Brazil</option>
                    </select>
                  </div>
                  <div className="form-group text-white pb-2">
                    <label htmlFor="roast">Roast Level</label>
                    <select
                      className="form-control"
                      id="roast"
                      name="roast" // Added name attribute
                      value={formData.roast} // Controlled component
                      onChange={handleChange}  // Controlled component
                      required
                    >
                      <option value="Light Roast">Light Roast</option>
                      <option value="Medium Roast">Medium Roast</option>
                      <option value="Dark Roast">Dark Roast</option>
                    </select>
                  </div>
                  <div className="form-group text-white pb-3">
                    <label htmlFor="textarea">Additional Specifications</label>
                    <textarea
                      className="form-control"
                      id="textarea" // Kept ID for label, but name is for state
                      name="additionalNotes" // Changed name to match state and backend
                      rows="3"
                      placeholder="If you have any special requests, let us know!"
                      value={formData.additionalNotes} // Controlled component
                      onChange={handleChange}        // Controlled component
                    ></textarea>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button
                      type="submit" // type="submit" is correct for form submission
                      // onClick was removed as onSubmit on <form> handles it
                      className="btn btn-warning"
                      disabled={isSubmitting} // Disable button while submitting
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Order'}
                    </button>
                  </div>
                </form>
              </animated.div>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Form;