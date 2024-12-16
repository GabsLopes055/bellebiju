# Como usar o Component 

```html
    <tgt-list>
        <div header class="header-list">
            <tgt-header-list>
                <tgt-header-col >Nome</tgt-header-col>
                <tgt-header-col >Período</tgt-header-col>
                <tgt-header-col >Status</tgt-header-col>
                <tgt-header-col >Orçamento</tgt-header-col>
                <tgt-header-col ></tgt-header-col>
            </tgt-header-list>
        </div>
        <div body>
            <tgt-item-list>
                <tgt-item-data >Supervisor</tgt-item-data>
                <tgt-item-data >01/03/24 a 30/06/24 </tgt-item-data>
                <tgt-item-data >Ativa</tgt-item-data>
                <tgt-item-data >{{10000000 | currency: 'R$ '}}</tgt-item-data>
                <tgt-item-data >
                    <tgt-button icon="trending_flat" iconPosition="left" size="middle" color="secundary"></tgt-button>
                </tgt-item-data>
            </tgt-item-list>
        </div>
    </tgt-list>

```