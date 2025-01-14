import React from "react"
import linksService from '../../../services/links-service'
import LinkCreator from "../link-creator/LinkCreator"
import LinkItem from "../link-item/LinkItem"


class Linkslist extends React.Component {

    state = {
        links: [],
        isLoading: true
    }

    fetchLinks() {
        linksService.list()
            .then(links => this.setState({ links, isLoading: false }))
            .catch(error => {
                this.setState({ isLoading: false })
                console.error(error)
            })
    }

    componentDidMount() {
        this.fetchLinks();
    }

    handleCreateLink(link) {
        this.setState(({ links }) => ({
            links: [link, ...links]
        }))
    }
    handleDeleteLink(id) {
        linksService.remove(id)
            .then(() => this.fetchLinks())
            .catch(error => console.error(error))
    }

    render() {
        const { links, isLoading } = this.state;
        return (
            links &&
            <>
                <div className="row mb-2">
                    <div className="col">
                        <h3 className="mb-3">Save now, read later</h3>
                        <LinkCreator onCreateLink={(link) => this.handleCreateLink(link)} />
                    </div>
                </div>

                {isLoading ? (<i className="fa fa-gear fa-spin" />) : (
                    <div className="row mb-2">
                        <div className="col">
                            {links.map(link =>
                                <div key={link.id} className="mb-2">
                                    <LinkItem {...link} onDeleteLink={(id) => this.handleDeleteLink(id)} />
                                </div>)}
                        </div>
                    </div>
                )}
            </>
        )
    }
}
export default Linkslist