import React, { useContext } from 'react';
import { Card, Badge } from 'react-bootstrap';
import { ModelContext } from './ModelContext';
import './Model.css';


export default function ModelCard({ model, ...props }) {
    const { setCurrentModel } = useContext(ModelContext);

    function getThumbnailImage(images) {
        let thumbnail;
        images.some((el) => {
            thumbnail = el.image.src;
            return el.is_thumbnail;
        });
        return thumbnail;
    }

    return (
        <>
            <Card className="model-card" key={model.id} onClick={() => setCurrentModel(model)} role="button">
                <Card.Img className="model-card-image" variant="top" src={getThumbnailImage(model.images)} />
                <Card.Body>
                    <Card.Title>{model.name}</Card.Title>
                    <Card.Text>
                        <span dangerouslySetInnerHTML={{ __html: model.description }} />
                    </Card.Text>
                    <Badge variant="secondary">{model.print_time} минут</Badge>{' '}
                    <Badge variant="secondary">{model.pieces_num} шт.</Badge>{' '}
                    <Badge variant="secondary">{model.piece_size}</Badge>{' '}
                    <Badge variant="secondary">{model.colors_num}</Badge>{' '}
                </Card.Body>
            </Card>

        </>
    )
}
