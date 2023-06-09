import React, { useState } from 'react'

const ContactForm = () => {
  const defaultValues = { name: '', email: '', comments: '', alert: '' }
  const [form, setForm] = useState(defaultValues)
  const [errors, setErrors] = useState(defaultValues)

  const [success, setSuccess] = useState(defaultValues)
  const [badge, setBadge] = useState(false)
  const [successhow, setSucceSshow] = useState(false)

  const validateName = (value) => {
    const regEx = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    if (value.length < 3 || !regEx.test(value))
      setErrors(current => ({ ...current, name: 'a valid name is required' }))
    else
      setErrors(current => ({ ...current, name: '' }))
  }

  const validateEmail = (value) => {
    const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEx.test(value))
      setErrors(current => ({ ...current, email: 'a valid email is required' }))
    else
      setErrors(current => ({ ...current, email: '' }))
  }

  const validateComments = (value) => {
    if (value.length < 5)
      setErrors(current => ({ ...current, comments: 'a valid comment required' }))
    else
      setErrors(current => ({ ...current, comments: '' }))
  }

  const onChangeHandler = (e) => {
    const { id, value } = e.target
    setForm(current => ({ ...current, [id]: value }))


    switch (id) {
      case 'name':
        validateName(e.target.value)
        break;

      case 'email':
        validateEmail(e.target.value)
        break;

      case 'comments':
        validateComments(e.target.value)
        break;
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (form.name !== '' && form.email !== '' && form.comments !== '') {
      if (errors.name === '' && errors.email === '' && errors.comments === '') {

        const res = await fetch('https://kyh-net22.azurewebsites.net/api/contacts', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form)
        })

        if (res.status === 200) {
          setSuccess(current => ({ ...current, alert: 'Your request has been sent.' }))
          setBadge(true)
          setSucceSshow(true)
          console.log('Your request has been sent.')
          setForm(defaultValues)
          setErrors(defaultValues)
        }
        setTimeout(() => {
          setSuccess(current => ({ ...current, alert: '' }))
        }, 10000);

        setTimeout(() => {
          setBadge(false)
          setSucceSshow(false)
        }, 10000);

      }
    }
  }

  return (
    <section className="contact-form">
      <div className="container">
        <h1>Come in Contact with Us</h1>

        <form onSubmit={onSubmitHandler} noValidate>

          <div className="contact-form-name">
            <input id="name" type="text" placeholder='Your Name' value={form.name} onChange={onChangeHandler} />
            <div className="error">{errors.name}</div>

          </div>

          <div className="contact-form-email">
            <input id="email" type="email" placeholder='Your Mail' value={form.email} onChange={onChangeHandler} />
            <div className="error">{errors.email}</div>
          </div>
          <div className="contact-form-comments">
            <textarea id="comments" placeholder='Comments' value={form.comments} onChange={onChangeHandler}></textarea>
            <div className="error">{errors.comments}</div>
          </div>

          <button className="btn-theme" type="submit">Post Comments</button>
          <div className={successhow ? 'success' : ''} id='alert' >{success.alert}
            <div className='icon'><i className={badge ? 'fa-solid fa-message-check' : ''}></i></div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm