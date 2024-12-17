export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          created_at: string
          id: string
          initial_balance: number | null
          name: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          initial_balance?: number | null
          name: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          initial_balance?: number | null
          name?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias: {
        Row: {
          created_at: string
          id: string
          nome: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          nome: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          nome?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      "formas de pgt": {
        Row: {
          created_at: string
          forma_pgt: string | null
          id: number
        }
        Insert: {
          created_at?: string
          forma_pgt?: string | null
          id?: number
        }
        Update: {
          created_at?: string
          forma_pgt?: string | null
          id?: number
        }
        Relationships: []
      }
      planejamento: {
        Row: {
          category_id: string | null
          created_at: string
          description: string | null
          estimated_value: number
          expected_date: string
          id: string
          item: string
          observacoes: string | null
          parcelas: number | null
          priority: string
          regularidade: string | null
          saved_amount: number | null
          status: string
          subcategory_id: string | null
          user_id: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          estimated_value: number
          expected_date: string
          id?: string
          item: string
          observacoes?: string | null
          parcelas?: number | null
          priority: string
          regularidade?: string | null
          saved_amount?: number | null
          status: string
          subcategory_id?: string | null
          user_id?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          description?: string | null
          estimated_value?: number
          expected_date?: string
          id?: string
          item?: string
          observacoes?: string | null
          parcelas?: number | null
          priority?: string
          regularidade?: string | null
          saved_amount?: number | null
          status?: string
          subcategory_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shopping_plans_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_plans_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shopping_plans_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          familia: string | null
          full_name: string | null
          id: string
          senha: string | null
          telefone: number | null
        }
        Insert: {
          created_at?: string
          familia?: string | null
          full_name?: string | null
          id: string
          senha?: string | null
          telefone?: number | null
        }
        Update: {
          created_at?: string
          familia?: string | null
          full_name?: string | null
          id?: string
          senha?: string | null
          telefone?: number | null
        }
        Relationships: []
      }
      subcategorias: {
        Row: {
          categoria_id: string | null
          criado: string | null
          id: string
          nome: string
        }
        Insert: {
          categoria_id?: string | null
          criado?: string | null
          id?: string
          nome: string
        }
        Update: {
          categoria_id?: string | null
          criado?: string | null
          id?: string
          nome?: string
        }
        Relationships: [
          {
            foreignKeyName: "subcategories_category_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
        ]
      }
      transacoes: {
        Row: {
          account_id: string | null
          categoria_id: string | null
          created_at: string
          date: string
          descricao: string | null
          id: string
          observacoes: string | null
          parcelas: number | null
          regularidade:
            | Database["public"]["Enums"]["regularidade_parcelas"]
            | null
          responsavel: string | null
          status: Database["public"]["Enums"]["status_transacoes"]
          subcategoria_id: string | null
          tipo: Database["public"]["Enums"]["tipo_despesa"]
          url_anexos: string | null
          user_id: string | null
          valor: number
        }
        Insert: {
          account_id?: string | null
          categoria_id?: string | null
          created_at?: string
          date: string
          descricao?: string | null
          id?: string
          observacoes?: string | null
          parcelas?: number | null
          regularidade?:
            | Database["public"]["Enums"]["regularidade_parcelas"]
            | null
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_transacoes"]
          subcategoria_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_despesa"]
          url_anexos?: string | null
          user_id?: string | null
          valor: number
        }
        Update: {
          account_id?: string | null
          categoria_id?: string | null
          created_at?: string
          date?: string
          descricao?: string | null
          id?: string
          observacoes?: string | null
          parcelas?: number | null
          regularidade?:
            | Database["public"]["Enums"]["regularidade_parcelas"]
            | null
          responsavel?: string | null
          status?: Database["public"]["Enums"]["status_transacoes"]
          subcategoria_id?: string | null
          tipo?: Database["public"]["Enums"]["tipo_despesa"]
          url_anexos?: string | null
          user_id?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "transacoes_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transacoes_responsavel_fkey"
            columns: ["responsavel"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["full_name"]
          },
          {
            foreignKeyName: "transacoes_subcategoria_id_fkey"
            columns: ["subcategoria_id"]
            isOneToOne: false
            referencedRelation: "subcategorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      regularidade_parcelas:
        | "Único"
        | "Semanal"
        | "Trimestral"
        | "Mensal"
        | "Anual"
      status_transacoes: "Pago" | "Programado" | "Atrasado" | "Cancelado"
      tipo_categoria:
        | "Automática"
        | "Moradia"
        | "Alimentação"
        | "Saúde"
        | "Transporte"
        | "Lazer e Entretenimento"
        | "Educação e Desenvolvimento"
        | "Vestuário e Acessórios"
        | "Bem-Estar e Cuidados Pessoais"
        | "Serviços Financeiros"
        | "Comunicação e Tecnologia"
        | "Casa e Jardim"
        | "Impostos e Taxas Governamentais"
        | "Outros/Imprevistos"
      tipo_despesa: "Receita" | "Despesa"
      tipo_subcategoria:
        | "Automática"
        | "Aluguel"
        | "Condomínio"
        | "Água"
        | "Energia Elétrica"
        | "IPTU"
        | "Manutenção Residencial"
        | "Seguros Residenciais"
        | "Internet Residencial"
        | "Supermercado"
        | "Restaurantes"
        | "Delivery"
        | "Refeições no Trabalho"
        | "Feiras Livres"
        | "Assinaturas de Cestas de Alimentos"
        | "Plano de Saúde"
        | "Medicamentos"
        | "Consultas"
        | "Exames"
        | "Tratamentos Odontológicos"
        | "Terapias"
        | "Imunizações"
        | "Transporte Público"
        | "Combustível"
        | "Estacionamento"
        | "Manutenção do Veículo"
        | "Pedágios"
        | "Seguros de Veículos"
        | "Cinema"
        | "Viagens"
        | "Eventos Sociais"
        | "Cursos de Lazer (culinária, música, dança)"
        | "Ingressos para shows/teatro"
        | "Assinaturas de Streaming (filmes, séries, música)"
        | "Atividades ao Ar Livre"
        | "Educação Formal (Escola, Faculdade)"
        | "Cursos de Especialização"
        | "Livros"
        | "Material Escolar"
        | "Aulas Particulares"
        | "Workshops"
        | "Treinamentos Profissionais"
        | "Roupas"
        | "Calçados"
        | "Acessórios"
        | "Serviços de Costura"
        | "Beleza (cabeleireiro, estética)"
        | "Academia"
        | "Massagens"
        | "Cuidados com a Pele"
        | "Assinaturas de Apps de Bem-Estar"
        | "Taxas Bancárias"
        | "Seguros (Vida, Residência, Saúde, Veicular)"
        | "Consultoria Financeira"
        | "Investimentos"
        | "Previdência Privada"
        | "Telefonia Móvel"
        | "TV a Cabo"
        | "Assinaturas de Software"
        | "Suporte Técnico"
        | "Equipamentos Eletrônicos"
        | "Domínios e Hospedagem"
        | "Planos de Dados Móveis"
        | "Materiais de Limpeza"
        | "Ferramentas"
        | "Decoração"
        | "Jardinagem"
        | "Produtos para Pets"
        | "Serviços de Limpeza Terceirizados"
        | "Pequenos Reparos"
        | "IRPF (Imposto de Renda)"
        | "IPVA (Imposto sobre Veículos)"
        | "Licenciamento de Veículos"
        | "Taxas de Cartório"
        | "Outras Taxas Oficiais"
        | "Imprevistos"
        | "Reparos Emergenciais"
        | "Presentes"
        | "Doações"
        | "Assinaturas Diversas"
        | "Documentação (passaportes, certidões)"
        | "Itens Diversos"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
