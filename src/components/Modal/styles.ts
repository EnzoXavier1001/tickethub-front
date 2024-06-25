import styled from "styled-components";


export const Container = styled.div`
    background-color: rgba(0, 0, 0, 0.5);

    .modal-wrapper {
        min-width: 36rem;
    }

    .btn-cancel {
        transition: all 0.6ms linear;
    }

    .btn-cancel:hover {
        color: #FF0000;
        animation-name: rotateAnimation;
        animation-duration: 0.4s;
    }

    @media (max-width: 768px) {
        .modal-wrapper {
            min-width: auto;
        }
    }

    @keyframes rotateAnimation {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(90deg);
        }
    }
`

export const Error = styled.p`
    color: #FF0000;
`