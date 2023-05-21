import React, { useEffect } from 'react'
import styled from 'styled-components'

const Avatar = ( url, user ) => {
    // console.log(url)
  return (
    <Wrapper className='d-flex justify-content-center align-content-center'>
        {
            url ? (
                <AvatarWrapper className=''>
                    <Image src={url.url} alt={url.user} width={100} height={100} className='img-responsive rounded-circle border border-2' />
                </AvatarWrapper>
            ) : (
                <NameWraper>{user}</NameWraper>
            )
        }
    </Wrapper>
  )
}

export default Avatar

const Wrapper = styled.div``

const AvatarWrapper = styled.div`
width: 200px;
`

const NameWraper = styled.div`
`
const Image = styled.img``