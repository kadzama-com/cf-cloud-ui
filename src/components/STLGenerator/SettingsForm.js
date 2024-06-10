import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./SettingsForm.css"


export default function SettingsForm({ updateSTL, setStlSettings }) {
    const fontsList = [
        { value: "Pacifico", title: "Pacifico", class: "fontPacifico" },
        { value: "Liberation Sans:style=Bold", title: "Sans Bold", class: "fontPTSans" },
        { value: "Liberation Serif:style=Bold Italic", title: "Serif Bold", class: "fontPTSerif" },
        { value: "Raleway:style=Black", title: "Raleway Black", class: "fontRaleway" },
        { value: "Lobster", title: "Lobster", class: "fontLobster" },
        { value: "Vollkorn:style=Black", title: "Vollkorn", class: "fontVollkorn" },
        { value: "Alegreya Sans:style=Black Italic", title: "Alegreya Sans", class: "fontAlegreya" },
        { value: "Vesterbro", title: "Vesterbro", class: "fontVollkorn" },
    ]

    return (
        <>
            <Form>
                <Form.Group as={Row}>
                    <Form.Label column >Text</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="text" defaultValue="Chocolate Fiesta" onChange={e => setStlSettings({ text: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Heigth, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="5" onChange={e => setStlSettings({ depth: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Width, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="100" onChange={e => setStlSettings({ width: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Heigth of foundation, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="10" defaultValue="2" onChange={e => setStlSettings({ foundation_depth: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Width of foundation, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="0.1" defaultValue="2" onChange={e => setStlSettings({ foundation_offset: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Word merger foundation width, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" step="1" defaultValue="7" onChange={e => setStlSettings({ foundation_joiner_height: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Letter spacing, mm</Form.Label>
                    <Col >
                        <Form.Control size="sm" type="number" defaultValue="1.0" onChange={e => setStlSettings({ text_spacing: e.target.value })} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column >Font</Form.Label>
                    <Col>
                        <div key="defaultradio" className="mb-3">
                            {fontsList.map((font, id) => {
                                return (
                                    <Form.Check
                                        defaultChecked={id === 0}
                                        id={font.value}
                                        type='radio'
                                        label={font.title}
                                        name='radio-font'
                                        className={font.class}
                                        key={font.value}
                                        onChange={(e) => { console.log("UPDATE STATE"); setStlSettings({ font: e.target.id }) }}
                                    />
                                )
                            })}
                        </div>
                    </Col>
                </Form.Group>
            </Form>
            <Button onClick={() => updateSTL()}>Generate</Button>
        </>
    );
}
