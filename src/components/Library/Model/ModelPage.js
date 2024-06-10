import React, { useContext } from 'react';
import { Button, Carousel, Row, Col, Badge } from 'react-bootstrap';
import { ModelContext } from './ModelContext';

export default function ModelPage() {
    const { currentModel: model, cleanCurrentModel } = useContext(ModelContext);

    return (
        <>
            <Button variant="link" onClick={cleanCurrentModel}>⟵ Вернуться назад</Button>
            <Row>
                <Col sm={5}>
                    <Carousel>
                        {model.images.map(image => {
                            return (
                                <Carousel.Item>
                                    <img
                                        className="d-block w-100"
                                        src={image.image.src}
                                        alt="First slide"
                                    />
                                </Carousel.Item>)
                        })}
                    </Carousel>
                </Col>
                <Col sm={7} >
                    <h2>{model.name}</h2>
                    <span dangerouslySetInnerHTML={{ __html: model.description }} />
                    <h4>
                        <Badge variant="secondary">{model.print_time} минут</Badge>{' '}
                        <Badge variant="secondary">{model.pieces_num} шт.</Badge>{' '}
                        <Badge variant="secondary">{model.piece_size}</Badge>{' '}
                        <Badge variant="secondary">{model.colors_num}</Badge>{' '}
                    </h4>
                    <h4>Файлы</h4>
                    <ul>
                        {model.files.map(file => {
                            return (
                                <li>
                                    <Button as="a" target="_blank" variant="link" href={file.file.src} download={file.file.title}>
                                        {file.name || file.file.title}
                                    </Button>
                                </li>
                            )
                        })}
                    </ul>
                </Col>
            </Row>
        </>
    )
}
