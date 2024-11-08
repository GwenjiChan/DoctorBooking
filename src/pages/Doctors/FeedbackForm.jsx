import { useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useParams } from 'react-router-dom'
import { BASE_URL, token } from '../../config.js'
import { toast } from 'react-toastify'
import HashLoader from 'react-spinners/HashLoader.js'

const FeedbackForm = () => {
    const [ratings, setRatings] = useState(0)
    const [hover, setHover] = useState(0)
    const [reviewText, setReviewText] = useState('')
    const [loading, setLoading] = useState(false)

    const { id } = useParams()

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)

        try {
            if (!ratings || !reviewText) {
                setLoading(false)
                return toast.error('Rating and Reviews fields are required')
                
            }

            const res = await fetch(`${BASE_URL}/doctors/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ratings, reviewText })
            })
            const result = await res.json()
            if (!res.ok) {
                throw new Error(result.message)
            }

            setLoading(false)
            toast.success(result.message)
        } catch (error) {
            setLoading(false)
            toast.error(error.message)
        }
    }

    return (
        <form action="">
            <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                How would you rate the overall experience?
            </h3>
            <div>
                {[...Array(5).keys()].map((_, index) => {
                    index += 1
                    return (
                        <button
                            key={index}
                            type='button'
                            className={`${
                                index <= (hover || ratings) ? "text-yellowColor" : "text-gray-400"
                            } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                            onClick={() => setRatings(index)}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(ratings)}
                            onDoubleClick={() => { setHover(0); setRatings(0) }}
                        >
                            <span><AiFillStar /></span>
                        </button>
                    )
                })}
            </div>
            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4'>
                    Share your feedback or suggestion
                </h3>
                <textarea
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    rows='5'
                    placeholder='Write your feedback or suggestion'
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
            </div>
            <button type='submit' className='btn' onClick={handleSubmit}>
                {loading ? <HashLoader size={25} color='#fff' /> : 'Submit Feedback'}
            </button>
        </form>
    )
}

export default FeedbackForm
